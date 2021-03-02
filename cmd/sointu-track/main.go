package main

import (
	"fmt"
	"os"

	"github.com/vsariola/sointu/oto"
	"github.com/vsariola/sointu/tracker/gioui"
	"github.com/vsariola/sointu/vm"
)

func main() {
	audioContext, err := oto.NewContext()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer audioContext.Close()
	synthService := vm.SynthService{}
	gioui.Main(audioContext, synthService)
}
