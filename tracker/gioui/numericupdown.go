package gioui

import (
	"fmt"
	"image"
	"image/color"

	"golang.org/x/exp/shiny/materialdesign/icons"

	"gioui.org/font"
	"gioui.org/op/clip"
	"gioui.org/op/paint"
	"gioui.org/widget"
	"gioui.org/x/component"

	"gioui.org/gesture"
	"gioui.org/io/pointer"
	"gioui.org/layout"
	"gioui.org/op"
	"gioui.org/text"
	"gioui.org/unit"
	"gioui.org/widget/material"
)

type NumberInput struct {
	Value          int
	dragStartValue int
	dragStartXY    float32
	clickDecrease  gesture.Click
	clickIncrease  gesture.Click
	tipArea        component.TipArea
}

type NumericUpDownStyle struct {
	NumberInput     *NumberInput
	Min             int
	Max             int
	Color           color.NRGBA
	Font            font.Font
	TextSize        unit.Sp
	BorderColor     color.NRGBA
	IconColor       color.NRGBA
	BackgroundColor color.NRGBA
	CornerRadius    unit.Dp
	Border          unit.Dp
	ButtonWidth     unit.Dp
	UnitsPerStep    unit.Dp
	Tooltip         component.Tooltip
	Width           unit.Dp
	Height          unit.Dp
	shaper          text.Shaper
}

func NumericUpDown(th *material.Theme, number *NumberInput, min, max int, tooltip string) NumericUpDownStyle {
	bgColor := th.Palette.Fg
	bgColor.R /= 4
	bgColor.G /= 4
	bgColor.B /= 4
	return NumericUpDownStyle{
		NumberInput:     number,
		Min:             min,
		Max:             max,
		Color:           white,
		BorderColor:     th.Palette.Fg,
		IconColor:       th.Palette.ContrastFg,
		BackgroundColor: bgColor,
		CornerRadius:    unit.Dp(4),
		ButtonWidth:     unit.Dp(16),
		Border:          unit.Dp(1),
		UnitsPerStep:    unit.Dp(8),
		TextSize:        th.TextSize * 14 / 16,
		Tooltip:         Tooltip(th, tooltip),
		Width:           unit.Dp(70),
		Height:          unit.Dp(20),
		shaper:          *th.Shaper,
	}
}

func (s *NumericUpDownStyle) Layout(gtx C) D {
	if s.Tooltip.Text.Text != "" {
		return s.NumberInput.tipArea.Layout(gtx, s.Tooltip, s.actualLayout)
	}
	return s.actualLayout(gtx)
}

func (s *NumericUpDownStyle) actualLayout(gtx C) D {
	size := image.Pt(gtx.Dp(s.Width), gtx.Dp(s.Height))
	gtx.Constraints.Min = size
	rr := gtx.Dp(s.CornerRadius)
	border := gtx.Dp(s.Border)
	c := clip.UniformRRect(image.Rectangle{Max: gtx.Constraints.Min}, rr).Push(gtx.Ops)
	paint.Fill(gtx.Ops, s.BorderColor)
	c.Pop()
	off := op.Offset(image.Pt(border, border)).Push(gtx.Ops)
	c2 := clip.UniformRRect(image.Rectangle{Max: image.Pt(
		gtx.Constraints.Min.X-border*2,
		gtx.Constraints.Min.Y-border*2,
	)}, rr-border).Push(gtx.Ops)
	gtx.Constraints.Min.X -= int(border * 2)
	gtx.Constraints.Min.Y -= int(border * 2)
	gtx.Constraints.Max = gtx.Constraints.Min
	layout.Flex{Axis: layout.Horizontal, Alignment: layout.Middle}.Layout(gtx,
		layout.Rigid(s.button(gtx.Constraints.Max.Y, widgetForIcon(icons.NavigationArrowBack), -1, &s.NumberInput.clickDecrease)),
		layout.Flexed(1, s.layoutText),
		layout.Rigid(s.button(gtx.Constraints.Max.Y, widgetForIcon(icons.NavigationArrowForward), 1, &s.NumberInput.clickIncrease)),
	)
	if s.NumberInput.Value < s.Min {
		s.NumberInput.Value = s.Min
	}
	if s.NumberInput.Value > s.Max {
		s.NumberInput.Value = s.Max
	}
	off.Pop()
	c2.Pop()
	return layout.Dimensions{Size: size}
}

func (s *NumericUpDownStyle) button(height int, icon *widget.Icon, delta int, click *gesture.Click) layout.Widget {
	return func(gtx C) D {
		btnWidth := gtx.Dp(s.ButtonWidth)
		return layout.Stack{Alignment: layout.Center}.Layout(gtx,
			layout.Stacked(func(gtx layout.Context) layout.Dimensions {
				//paint.FillShape(gtx.Ops, black, clip.Rect(image.Rect(0, 0, btnWidth, height)).Op())
				return layout.Dimensions{Size: image.Point{X: btnWidth, Y: height}}
			}),
			layout.Expanded(func(gtx C) D {
				size := btnWidth
				if height < size {
					size = height
				}
				if size < 1 {
					size = 1
				}
				if icon != nil {
					p := gtx.Dp(unit.Dp(size))
					if p < 1 {
						p = 1
					}
					gtx.Constraints = layout.Exact(image.Pt(p, p))
					return icon.Layout(gtx, s.IconColor)
				}
				return layout.Dimensions{}
			}),
			layout.Expanded(func(gtx C) D {
				return s.layoutClick(gtx, delta, click)
			}),
		)
	}
}

func (s *NumericUpDownStyle) layoutText(gtx C) D {
	return layout.Stack{Alignment: layout.Center}.Layout(gtx,
		layout.Stacked(func(gtx C) D {
			paint.FillShape(gtx.Ops, s.BackgroundColor, clip.Rect(image.Rect(0, 0, gtx.Constraints.Max.X, gtx.Constraints.Max.Y)).Op())
			return layout.Dimensions{Size: gtx.Constraints.Max}
		}),
		layout.Expanded(func(gtx layout.Context) layout.Dimensions {
			paint.ColorOp{Color: s.Color}.Add(gtx.Ops)
			return widget.Label{Alignment: text.Middle}.Layout(gtx, &s.shaper, s.Font, s.TextSize, fmt.Sprintf("%v", s.NumberInput.Value), op.CallOp{})
		}),
		layout.Expanded(s.layoutDrag),
	)
}

func (s *NumericUpDownStyle) layoutDrag(gtx layout.Context) layout.Dimensions {
	{ // handle dragging
		pxPerStep := float32(gtx.Dp(s.UnitsPerStep))
		for _, ev := range gtx.Events(s.NumberInput) {
			if e, ok := ev.(pointer.Event); ok {
				switch e.Type {
				case pointer.Press:
					s.NumberInput.dragStartValue = s.NumberInput.Value
					s.NumberInput.dragStartXY = e.Position.X - e.Position.Y

				case pointer.Drag:
					var deltaCoord float32
					deltaCoord = e.Position.X - e.Position.Y - s.NumberInput.dragStartXY
					s.NumberInput.Value = s.NumberInput.dragStartValue + int(deltaCoord/pxPerStep+0.5)
				}
			}
		}

		// Avoid affecting the input tree with pointer events.
		stack := op.Offset(image.Point{}).Push(gtx.Ops)
		// register for input
		dragRect := image.Rect(0, 0, gtx.Constraints.Min.X, gtx.Constraints.Min.Y)
		area := clip.Rect(dragRect).Push(gtx.Ops)
		pointer.InputOp{
			Tag:   s.NumberInput,
			Types: pointer.Press | pointer.Drag | pointer.Release,
		}.Add(gtx.Ops)
		area.Pop()
		stack.Pop()
	}
	return layout.Dimensions{Size: gtx.Constraints.Min}
}

func (s *NumericUpDownStyle) layoutClick(gtx layout.Context, delta int, click *gesture.Click) layout.Dimensions {
	// handle clicking
	for _, e := range click.Events(gtx) {
		switch e.Type {
		case gesture.TypeClick:
			s.NumberInput.Value += delta
		}
	}
	// Avoid affecting the input tree with pointer events.
	stack := op.Offset(image.Point{}).Push(gtx.Ops)

	// register for input
	clickRect := image.Rect(0, 0, gtx.Constraints.Min.X, gtx.Constraints.Min.Y)
	area := clip.Rect(clickRect).Push(gtx.Ops)
	click.Add(gtx.Ops)
	area.Pop()
	stack.Pop()
	return layout.Dimensions{Size: gtx.Constraints.Min}
}
