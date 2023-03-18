import yaml from 'json-to-pretty-yaml';
import groove from './tests/grooveisinthecode.js';
import { writeFile } from 'fs/promises';

const doc = {
    bpm: groove.BPM,
    rowsperbeat: 4,
    score: {
        length: groove.instrumentPatternLists[0].length,
        rowsperpattern: groove.patternsize,
        tracks: groove.instrumentPatternLists.slice(0, 7).map(track => {
            const patternMap = {};
            track.forEach(patternIndex => {
                patternMap[`${patternIndex}`] = groove.patterns[patternIndex-1];
            });
            const patternIndices = Object.keys(patternMap);
            const patterns = patternIndices.map(patternIndex => patternMap[`${patternIndex}`]);
            const order = track.map((patternIndex) => {
                return patternIndices.indexOf(`${patternIndex}`);
            });
            return {
                numvoices: 1,
                order,
                patterns
            }
        })
    },
    patch: [
        {
            "numvoices": 1,
            "units": [
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 48,
                  "gain": 16,
                  "lfo": 0,
                  "phase": 0,
                  "shape": 63,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 126,
                  "detune": 78,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 59,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "noise",
                "parameters": {
                  "gain": 6,
                  "shape": 64,
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 128,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 50,
                  "decay": 64,
                  "gain": 96,
                  "release": 64,
                  "stereo": 1,
                  "sustain": 64
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 32,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "delay",
                "parameters": {
                  "damp": 64,
                  "dry": 64,
                  "feedback": 64,
                  "notetracking": 0,
                  "pregain": 64,
                  "stereo": 1
                },
                "varargs": [
                  9187,
                  9187
                ]
              },
              {
                "type": "outaux",
                "parameters": {
                  "auxgain": 128,
                  "outgain": 0,
                  "stereo": 1
                }
              }
            ]
          },
          {
            "numvoices": 1,
            "units": [
              {
                "type": "envelope",
                "parameters": {
                  "attack": 48,
                  "decay": 63,
                  "gain": 128,
                  "release": 64,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 112,
                  "stereo": 0
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 0,
                  "detune": 64,
                  "gain": 128,
                  "looplength": 1486,
                  "loopstart": 2536,
                  "phase": 64,
                  "samplestart": 250849,
                  "shape": 64,
                  "stereo": 0,
                  "transpose": 64,
                  "type": 1,
                  "unison": 0
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 16,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 0
                }
              },
              {
                "type": "filter",
                "id": 1,
                "parameters": {
                  "bandpass": 0,
                  "frequency": 22,
                  "highpass": 0,
                  "lowpass": 1,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 0
                }
              },
              {
                "type": "pan",
                "parameters": {
                  "panning": 64,
                  "stereo": 0
                }
              },
              {
                "type": "out",
                "parameters": {
                  "gain": 128,
                  "stereo": 1
                }
              },
              {
                "parameters": {}
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 0,
                  "decay": 64,
                  "gain": 128,
                  "release": 0,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 32,
                  "stereo": 0
                }
              },
              {
                "type": "send",
                "parameters": {
                  "amount": 79,
                  "port": 0,
                  "sendpop": 1,
                  "stereo": 0,
                  "target": 1
                }
              }
            ]
          },
          {
            "numvoices": 1,
            "units": [
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 48,
                  "gain": 16,
                  "lfo": 0,
                  "phase": 0,
                  "shape": 63,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 126,
                  "detune": 78,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 59,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "noise",
                "parameters": {
                  "gain": 6,
                  "shape": 64,
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 128,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 50,
                  "decay": 64,
                  "gain": 96,
                  "release": 64,
                  "stereo": 1,
                  "sustain": 64
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 32,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "delay",
                "parameters": {
                  "damp": 64,
                  "dry": 64,
                  "feedback": 64,
                  "notetracking": 0,
                  "pregain": 64,
                  "stereo": 1
                },
                "varargs": [
                  9187,
                  9187
                ]
              },
              {
                "type": "outaux",
                "parameters": {
                  "auxgain": 128,
                  "outgain": 0,
                  "stereo": 1
                }
              }
            ]
          },
          {
            "numvoices": 1,
            "units": [
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 48,
                  "gain": 16,
                  "lfo": 0,
                  "phase": 0,
                  "shape": 63,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 126,
                  "detune": 78,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 59,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "noise",
                "parameters": {
                  "gain": 6,
                  "shape": 64,
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 128,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 50,
                  "decay": 64,
                  "gain": 96,
                  "release": 64,
                  "stereo": 1,
                  "sustain": 64
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 32,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "delay",
                "parameters": {
                  "damp": 64,
                  "dry": 64,
                  "feedback": 64,
                  "notetracking": 0,
                  "pregain": 64,
                  "stereo": 1
                },
                "varargs": [
                  9187,
                  9187
                ]
              },
              {
                "type": "outaux",
                "parameters": {
                  "auxgain": 128,
                  "outgain": 0,
                  "stereo": 1
                }
              }
            ]
          },
          {
            "numvoices": 1,
            "units": [
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 48,
                  "gain": 16,
                  "lfo": 0,
                  "phase": 0,
                  "shape": 63,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 126,
                  "detune": 78,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "oscillator",
                "parameters": {
                  "color": 2,
                  "detune": 59,
                  "gain": 16,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 1,
                  "transpose": 64,
                  "type": 1,
                  "unison": 3
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "noise",
                "parameters": {
                  "gain": 6,
                  "shape": 64,
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 128,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 50,
                  "decay": 64,
                  "gain": 96,
                  "release": 64,
                  "stereo": 1,
                  "sustain": 64
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 1
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 32,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 1
                }
              },
              {
                "type": "delay",
                "parameters": {
                  "damp": 64,
                  "dry": 64,
                  "feedback": 64,
                  "notetracking": 0,
                  "pregain": 64,
                  "stereo": 1
                },
                "varargs": [
                  9187,
                  9187
                ]
              },
              {
                "type": "outaux",
                "parameters": {
                  "auxgain": 128,
                  "outgain": 0,
                  "stereo": 1
                }
              }
            ]
          },
          {
            "numvoices": 1,
            "units": [
              {
                "type": "envelope",
                "parameters": {
                  "attack": 36,
                  "decay": 69,
                  "gain": 128,
                  "release": 32,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 112,
                  "stereo": 0
                }
              },
              {
                "type": "oscillator",
                "id": 1,
                "parameters": {
                  "color": 128,
                  "detune": 64,
                  "gain": 128,
                  "looplength": 1,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 0,
                  "transpose": 64,
                  "type": 0
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 14,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 0
                }
              },
              {
                "type": "push",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 16,
                  "highpass": 0,
                  "lowpass": 1,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 0
                }
              },
              {
                "type": "delay",
                "parameters": {
                  "count": 8,
                  "damp": 64,
                  "delay": 1,
                  "dry": 0,
                  "feedback": 96,
                  "notetracking": 0,
                  "pregain": 32,
                  "stereo": 0
                },
                "varargs": [
                  1116,
                  1188,
                  1276,
                  1356,
                  1422,
                  1492,
                  1556,
                  1618
                ]
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "type": "pan",
                "parameters": {
                  "panning": 64,
                  "stereo": 0
                }
              },
              {
                "type": "out",
                "parameters": {
                  "gain": 64,
                  "stereo": 1
                }
              },
              {
                "parameters": {}
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 0,
                  "decay": 70,
                  "gain": 128,
                  "release": 70,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 5,
                  "stereo": 0
                }
              },
              {
                "type": "send",
                "parameters": {
                  "amount": 101,
                  "port": 0,
                  "sendpop": 1,
                  "stereo": 0,
                  "target": 1
                }
              },
              {
                "parameters": {}
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 48,
                  "decay": 58,
                  "gain": 128,
                  "release": 0,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 64,
                  "stereo": 0
                }
              },
              {
                "type": "send",
                "parameters": {
                  "amount": 32,
                  "port": 5,
                  "sendpop": 1,
                  "stereo": 0,
                  "target": 1,
                  "unit": 0,
                  "voice": 0
                }
              }
            ]
          },
          {
            "numvoices": 1,
            "units": [
              {
                "type": "envelope",
                "parameters": {
                  "attack": 32,
                  "decay": 60,
                  "gain": 128,
                  "release": 0,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "oscillator",
                "id": 1,
                "parameters": {
                  "color": 64,
                  "detune": 64,
                  "gain": 128,
                  "phase": 0,
                  "shape": 64,
                  "stereo": 0,
                  "transpose": 64,
                  "type": 1
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "parameters": {}
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 32,
                  "decay": 64,
                  "gain": 64,
                  "release": 66,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 32,
                  "stereo": 0
                }
              },
              {
                "type": "noise",
                "parameters": {
                  "gain": 64,
                  "shape": 64,
                  "stereo": 0
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "type": "filter",
                "parameters": {
                  "bandpass": 0,
                  "frequency": 106,
                  "highpass": 1,
                  "lowpass": 0,
                  "negbandpass": 0,
                  "neghighpass": 0,
                  "resonance": 128,
                  "stereo": 0
                }
              },
              {
                "type": "addp",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "parameters": {}
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 112,
                  "stereo": 0
                }
              },
              {
                "type": "delay",
                "parameters": {
                  "count": 8,
                  "damp": 0,
                  "delay": 1,
                  "dry": 128,
                  "feedback": 40,
                  "notetracking": 0,
                  "pregain": 24,
                  "stereo": 0
                },
                "varargs": [
                  1116,
                  1188,
                  1276,
                  1356,
                  1422,
                  1492,
                  1556,
                  1618
                ]
              },
              {
                "type": "compressor",
                "parameters": {
                  "attack": 51,
                  "invgain": 64,
                  "ratio": 112,
                  "release": 49,
                  "stereo": 0,
                  "threshold": 64
                }
              },
              {
                "type": "mulp",
                "parameters": {
                  "stereo": 0
                }
              },
              {
                "parameters": {}
              },
              {
                "type": "pan",
                "parameters": {
                  "panning": 68,
                  "stereo": 0
                }
              },
              {
                "type": "outaux",
                "parameters": {
                  "auxgain": 0,
                  "outgain": 64,
                  "stereo": 1
                }
              },
              {
                "parameters": {}
              },
              {
                "type": "envelope",
                "parameters": {
                  "attack": 0,
                  "decay": 60,
                  "gain": 128,
                  "release": 0,
                  "stereo": 0,
                  "sustain": 0
                }
              },
              {
                "type": "distort",
                "parameters": {
                  "drive": 5,
                  "stereo": 0
                }
              },
              {
                "type": "send",
                "parameters": {
                  "amount": 90,
                  "port": 0,
                  "sendpop": 1,
                  "stereo": 0,
                  "target": 1,
                  "unit": 0,
                  "voice": 0
                }
              }
            ]
          }
    ]
}

await writeFile('tests/groove.yaml', yaml.stringify(doc));