import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Users, { User } from '@/models/User';
import SessionUsers, { SessionUser } from '@/models/Session';
import { SignalConfig } from '@/models/SignalConfig';
import {VideoConfig} from '@/models/VideoConfig';
import {Marker} from '@/models/Marker';

const signals : SignalConfig[] = [
  {
    "name": "Coordenadas raton",
    "descripcion": "Coordenadas x e y del raton capturado en Unity",
    "signalID": 0,
    "labels": [
      {
        "labelId": 0,
        "name": "value 0",
        "value": "Coordinate X"
      },
      {
        "labelId": 1,
        "name": "value 1",
        "value": "Coordinate Y"
      }
    ],
    "values": [
      {
        "idValue": 0,
        "sample": [491.0, 260.0],
        "timestamp": 1296216.3917789
      },
      {
        "idValue": 1,
        "sample": [594.0, 413.0],
        "timestamp": 1296220.8886482
      },
      {
        "idValue": 2,
        "sample": [558.0, 407.0],
        "timestamp": 1296220.9411281
      },
      {
        "idValue": 3,
        "sample": [545.0, 406.0],
        "timestamp": 1296220.9925573
      },
      {
        "idValue": 4,
        "sample": [530.0, 407.0],
        "timestamp": 1296221.0441217
      },
      {
        "idValue": 5,
        "sample": [512.0, 414.0],
        "timestamp": 1296221.0920145
      },
      {
        "idValue": 6,
        "sample": [489.0, 428.0],
        "timestamp": 1296221.1369311
      },
      {
        "idValue": 7,
        "sample": [466.0, 449.0],
        "timestamp": 1296221.1856834
      },
      {
        "idValue": 8,
        "sample": [453.0, 464.0],
        "timestamp": 1296221.2349855
      },
      {
        "idValue": 9,
        "sample": [454.0, 472.0],
        "timestamp": 1296221.2839138
      },
      {
        "idValue": 10,
        "sample": [475.0, 474.0],
        "timestamp": 1296221.3335907
      },
      {
        "idValue": 11,
        "sample": [513.0, 437.0],
        "timestamp": 1296221.3823273
      },
      {
        "idValue": 12,
        "sample": [577.0, 371.0],
        "timestamp": 1296221.4289362
      },
      {
        "idValue": 13,
        "sample": [634.0, 349.0],
        "timestamp": 1296221.4780359
      },
      {
        "idValue": 14,
        "sample": [691.0, 351.0],
        "timestamp": 1296221.5243559
      },
      {
        "idValue": 15,
        "sample": [729.0, 382.0],
        "timestamp": 1296221.5697892
      },
      {
        "idValue": 16,
        "sample": [723.0, 443.0],
        "timestamp": 1296221.627778
      },
      {
        "idValue": 17,
        "sample": [701.0, 492.0],
        "timestamp": 1296221.6870537
      },
      {
        "idValue": 18,
        "sample": [678.0, 504.0],
        "timestamp": 1296221.7504911
      },
      {
        "idValue": 19,
        "sample": [667.0, 495.0],
        "timestamp": 1296221.8001429
      },
      {
        "idValue": 20,
        "sample": [633.0, 456.0],
        "timestamp": 1296221.8555102
      },
      {
        "idValue": 21,
        "sample": [561.0, 394.0],
        "timestamp": 1296221.9049887
      },
      {
        "idValue": 22,
        "sample": [492.0, 343.0],
        "timestamp": 1296221.9583706
      },
      {
        "idValue": 23,
        "sample": [435.0, 332.0],
        "timestamp": 1296222.00888
      },
      {
        "idValue": 24,
        "sample": [258.0, 373.0],
        "timestamp": 1296222.0599332
      },
      {
        "idValue": 25,
        "sample": [186.0, 418.0],
        "timestamp": 1296222.1072564
      },
      {
        "idValue": 26,
        "sample": [182.0, 448.0],
        "timestamp": 1296222.1562227
      },
      {
        "idValue": 27,
        "sample": [228.0, 478.0],
        "timestamp": 1296222.2062996
      },
      {
        "idValue": 28,
        "sample": [358.0, 487.0],
        "timestamp": 1296222.2540788
      },
      {
        "idValue": 29,
        "sample": [428.0, 477.0],
        "timestamp": 1296222.3126951
      },
      {
        "idValue": 30,
        "sample": [463.0, 439.0],
        "timestamp": 1296222.3787326
      },
      {
        "idValue": 31,
        "sample": [507.0, 376.0],
        "timestamp": 1296222.4354051
      },
      {
        "idValue": 32,
        "sample": [584.0, 334.0],
        "timestamp": 1296222.5017764
      },
      {
        "idValue": 33,
        "sample": [657.0, 334.0],
        "timestamp": 1296222.5556637
      },
      {
        "idValue": 34,
        "sample": [718.0, 376.0],
        "timestamp": 1296222.6181249
      },
      {
        "idValue": 35,
        "sample": [724.0, 439.0],
        "timestamp": 1296222.6758983
      },
      {
        "idValue": 36,
        "sample": [702.0, 496.0],
        "timestamp": 1296222.7396834
      },
      {
        "idValue": 37,
        "sample": [668.0, 535.0],
        "timestamp": 1296222.7927907
      },
      {
        "idValue": 38,
        "sample": [662.0, 537.0],
        "timestamp": 1296222.8501143
      },
      {
        "idValue": 39,
        "sample": [645.0, 515.0],
        "timestamp": 1296222.9027919
      },
      {
        "idValue": 40,
        "sample": [600.0, 451.0],
        "timestamp": 1296222.9586744
      },
      {
        "idValue": 41,
        "sample": [515.0, 367.0],
        "timestamp": 1296223.0188105
      },
      {
        "idValue": 42,
        "sample": [440.0, 328.0],
        "timestamp": 1296223.0923767
      },
      {
        "idValue": 43,
        "sample": [367.0, 342.0],
        "timestamp": 1296223.1524172
      },
      {
        "idValue": 44,
        "sample": [277.0, 398.0],
        "timestamp": 1296223.2144817
      },
      {
        "idValue": 45,
        "sample": [275.0, 470.0],
        "timestamp": 1296223.2784574
      },
      {
        "idValue": 46,
        "sample": [336.0, 518.0],
        "timestamp": 1296223.3484978
      },
      {
        "idValue": 47,
        "sample": [397.0, 523.0],
        "timestamp": 1296223.4110661
      },
      {
        "idValue": 48,
        "sample": [473.0, 437.0],
        "timestamp": 1296223.4781513
      },
      {
        "idValue": 49,
        "sample": [558.0, 356.0],
        "timestamp": 1296223.5409257
      },
      {
        "idValue": 50,
        "sample": [631.0, 352.0],
        "timestamp": 1296223.6134501
      },
      {
        "idValue": 51,
        "sample": [651.0, 434.0],
        "timestamp": 1296223.6828768
      },
      {
        "idValue": 52,
        "sample": [617.0, 519.0],
        "timestamp": 1296223.7607554
      },
      {
        "idValue": 53,
        "sample": [573.0, 535.0],
        "timestamp": 1296223.8171593
      },
      {
        "idValue": 54,
        "sample": [518.0, 522.0],
        "timestamp": 1296223.8758804
      },
      {
        "idValue": 55,
        "sample": [478.0, 477.0],
        "timestamp": 1296223.9272935
      },
      {
        "idValue": 56,
        "sample": [422.0, 392.0],
        "timestamp": 1296223.9827572
      },
      {
        "idValue": 57,
        "sample": [385.0, 328.0],
        "timestamp": 1296224.0381649
      },
      {
        "idValue": 58,
        "sample": [373.0, 310.0],
        "timestamp": 1296224.0983139
      },
      {
        "idValue": 59,
        "sample": [329.0, 335.0],
        "timestamp": 1296224.1646633
      },
      {
        "idValue": 60,
        "sample": [286.0, 409.0],
        "timestamp": 1296224.2328985
      },
      {
        "idValue": 61,
        "sample": [315.0, 484.0],
        "timestamp": 1296224.3007941
      },
      {
        "idValue": 62,
        "sample": [389.0, 475.0],
        "timestamp": 1296224.3774832
      },
      {
        "idValue": 63,
        "sample": [467.0, 401.0],
        "timestamp": 1296224.4362747
      },
      {
        "idValue": 64,
        "sample": [523.0, 349.0],
        "timestamp": 1296224.5054984
      },
      {
        "idValue": 65,
        "sample": [599.0, 338.0],
        "timestamp": 1296224.5620774
      },
      {
        "idValue": 66,
        "sample": [680.0, 380.0],
        "timestamp": 1296224.6207324
      },
      {
        "idValue": 67,
        "sample": [666.0, 460.0],
        "timestamp": 1296224.6742483
      },
      {
        "idValue": 68,
        "sample": [619.0, 498.0],
        "timestamp": 1296224.7405713
      },
      {
        "idValue": 69,
        "sample": [585.0, 451.0],
        "timestamp": 1296224.8110045
      },
      {
        "idValue": 70,
        "sample": [549.0, 386.0],
        "timestamp": 1296224.8762142
      },
      {
        "idValue": 71,
        "sample": [477.0, 337.0],
        "timestamp": 1296224.9453905
      },
      {
        "idValue": 72,
        "sample": [245.0, 399.0],
        "timestamp": 1296225.0126773
      },
      {
        "idValue": 73,
        "sample": [87.0, 492.0],
        "timestamp": 1296225.0791293
      },
      {
        "idValue": 74,
        "sample": [72.0, 591.0],
        "timestamp": 1296225.160972
      },
      {
        "idValue": 75,
        "sample": [188.0, 636.0],
        "timestamp": 1296225.2306314
      },
      {
        "idValue": 76,
        "sample": [371.0, 615.0],
        "timestamp": 1296225.2988903
      },
      {
        "idValue": 77,
        "sample": [436.0, 517.0],
        "timestamp": 1296225.3625262
      },
      {
        "idValue": 78,
        "sample": [467.0, 452.0],
        "timestamp": 1296225.4292479
      },
      {
        "idValue": 79,
        "sample": [541.0, 416.0],
        "timestamp": 1296225.4926861
      },
      {
        "idValue": 80,
        "sample": [621.0, 449.0],
        "timestamp": 1296225.5520565
      },
      {
        "idValue": 81,
        "sample": [616.0, 542.0],
        "timestamp": 1296225.6205359
      },
      {
        "idValue": 82,
        "sample": [518.0, 619.0],
        "timestamp": 1296225.6833556
      },
      {
        "idValue": 83,
        "sample": [443.0, 624.0],
        "timestamp": 1296225.7417911
      },
      {
        "idValue": 84,
        "sample": [407.0, 576.0],
        "timestamp": 1296225.8009003
      },
      {
        "idValue": 85,
        "sample": [383.0, 514.0],
        "timestamp": 1296225.8602411
      },
      {
        "idValue": 86,
        "sample": [361.0, 444.0],
        "timestamp": 1296225.93046
      },
      {
        "idValue": 87,
        "sample": [342.0, 415.0],
        "timestamp": 1296226.0074052
      },
      {
        "idValue": 88,
        "sample": [277.0, 438.0],
        "timestamp": 1296226.0840035
      },
      {
        "idValue": 89,
        "sample": [191.0, 481.0],
        "timestamp": 1296226.1581432
      },
      {
        "idValue": 90,
        "sample": [158.0, 555.0],
        "timestamp": 1296226.2388706
      },
      {
        "idValue": 91,
        "sample": [172.0, 585.0],
        "timestamp": 1296226.3169133
      },
      {
        "idValue": 92,
        "sample": [196.0, 622.0],
        "timestamp": 1296226.3879853
      },
      {
        "idValue": 93,
        "sample": [213.0, 655.0],
        "timestamp": 1296226.4537673
      },
      {
        "idValue": 94,
        "sample": [228.0, 677.0],
        "timestamp": 1296226.5270483
      },
      {
        "idValue": 95,
        "sample": [256.0, 680.0],
        "timestamp": 1296226.5907232
      },
      {
        "idValue": 96,
        "sample": [411.0, 676.0],
        "timestamp": 1296226.6685328
      },
      {
        "idValue": 97,
        "sample": [547.0, 658.0],
        "timestamp": 1296226.7398963
      },
      {
        "idValue": 98,
        "sample": [578.0, 654.0],
        "timestamp": 1296226.8177187
      },
      {
        "idValue": 99,
        "sample": [586.0, 666.0],
        "timestamp": 1296226.8860334
      },
      {
        "idValue": 100,
        "sample": [618.0, 683.0],
        "timestamp": 1296226.9598761
      },
      {
        "idValue": 101,
        "sample": [644.0, 698.0],
        "timestamp": 1296227.0241385
      },
      {
        "idValue": 102,
        "sample": [662.0, 717.0],
        "timestamp": 1296227.0932182
      },
      {
        "idValue": 103,
        "sample": [671.0, 742.0],
        "timestamp": 1296227.1620205
      },
      {
        "idValue": 104,
        "sample": [674.0, 764.0],
        "timestamp": 1296227.2397197
      },
      {
        "idValue": 105,
        "sample": [671.0, 774.0],
        "timestamp": 1296227.3079243
      },
      {
        "idValue": 106,
        "sample": [660.0, 780.0],
        "timestamp": 1296227.3798376
      },
      {
        "idValue": 107,
        "sample": [607.0, 790.0],
        "timestamp": 1296227.4428408
      },
      {
        "idValue": 108,
        "sample": [501.0, 794.0],
        "timestamp": 1296227.5224857
      },
      {
        "idValue": 109,
        "sample": [443.0, 793.0],
        "timestamp": 1296227.5967368
      },
      {
        "idValue": 110,
        "sample": [418.0, 789.0],
        "timestamp": 1296227.6621904
      },
      {
        "idValue": 111,
        "sample": [379.0, 788.0],
        "timestamp": 1296227.7254233
      },
      {
        "idValue": 112,
        "sample": [337.0, 786.0],
        "timestamp": 1296227.7989784
      },
      {
        "idValue": 113,
        "sample": [307.0, 784.0],
        "timestamp": 1296227.8606079
      },
      {
        "idValue": 114,
        "sample": [270.0, 782.0],
        "timestamp": 1296227.925867
      },
      {
        "idValue": 115,
        "sample": [238.0, 780.0],
        "timestamp": 1296228.0000907
      },
      {
        "idValue": 116,
        "sample": [224.0, 780.0],
        "timestamp": 1296228.0655447
      },
      {
        "idValue": 117,
        "sample": [218.0, 780.0],
        "timestamp": 1296228.1307097
      },
      {
        "idValue": 118,
        "sample": [218.0, 780.0],
        "timestamp": 1296228.2020651
      },
      {
        "idValue": 119,
        "sample": [217.0, 780.0],
        "timestamp": 1296228.2709637
      },
      {
        "idValue": 120,
        "sample": [217.0, 780.0],
        "timestamp": 1296228.3512773
      },
      {
        "idValue": 121,
        "sample": [214.0, 779.0],
        "timestamp": 1296228.4226633
      },
      {
        "idValue": 122,
        "sample": [204.0, 727.0],
        "timestamp": 1296228.5010188
      },
      {
        "idValue": 123,
        "sample": [192.0, 470.0],
        "timestamp": 1296228.5718318
      },
      {
        "idValue": 124,
        "sample": [167.0, 221.0],
        "timestamp": 1296228.6472057
      },
      {
        "idValue": 125,
        "sample": [152.0, 160.0],
        "timestamp": 1296228.7155297
      },
      {
        "idValue": 126,
        "sample": [148.0, 91.0],
        "timestamp": 1296228.7863109
      },
      {
        "idValue": 127,
        "sample": [148.0, 76.0],
        "timestamp": 1296228.8596442
      },
      {
        "idValue": 128,
        "sample": [148.0, 74.0],
        "timestamp": 1296228.9350262
      },
      {
        "idValue": 129,
        "sample": [148.0, 74.0],
        "timestamp": 1296229.005182
      },
      {
        "idValue": 130,
        "sample": [148.0, 74.0],
        "timestamp": 1296229.0691174
      },
      {
        "idValue": 131,
        "sample": [148.0, 74.0],
        "timestamp": 1296229.1253367
      },
      {
        "idValue": 132,
        "sample": [148.0, 73.0],
        "timestamp": 1296229.1933672
      },
      {
        "idValue": 133,
        "sample": [221.0, 67.0],
        "timestamp": 1296229.2597494
      },
      {
        "idValue": 134,
        "sample": [443.0, 59.0],
        "timestamp": 1296229.3245505
      },
      {
        "idValue": 135,
        "sample": [637.0, 56.0],
        "timestamp": 1296229.387923
      },
      {
        "idValue": 136,
        "sample": [656.0, 56.0],
        "timestamp": 1296229.457068
      },
      {
        "idValue": 137,
        "sample": [667.0, 55.0],
        "timestamp": 1296229.5264833
      },
      {
        "idValue": 138,
        "sample": [706.0, 55.0],
        "timestamp": 1296229.5875172
      },
      {
        "idValue": 139,
        "sample": [724.0, 55.0],
        "timestamp": 1296229.6438179
      },
      {
        "idValue": 140,
        "sample": [725.0, 55.0],
        "timestamp": 1296229.7027075
      },
      {
        "idValue": 141,
        "sample": [725.0, 55.0],
        "timestamp": 1296229.7696845
      },
      {
        "idValue": 142,
        "sample": [725.0, 55.0],
        "timestamp": 1296229.8384887
      },
      {
        "idValue": 143,
        "sample": [725.0, 55.0],
        "timestamp": 1296229.9047487
      },
      {
        "idValue": 144,
        "sample": [725.0, 55.0],
        "timestamp": 1296229.9625994
      },
      {
        "idValue": 145,
        "sample": [725.0, 55.0],
        "timestamp": 1296230.0203625
      },
      {
        "idValue": 146,
        "sample": [725.0, 55.0],
        "timestamp": 1296230.0757834
      },
      {
        "idValue": 147,
        "sample": [725.0, 55.0],
        "timestamp": 1296230.1306468
      },
      {
        "idValue": 148,
        "sample": [725.0, 55.0],
        "timestamp": 1296230.1826411
      },
      {
        "idValue": 149,
        "sample": [702.0, 104.0],
        "timestamp": 1296230.2337889
      },
      {
        "idValue": 150,
        "sample": [500.0, 372.0],
        "timestamp": 1296230.2870467
      },
      {
        "idValue": 151,
        "sample": [338.0, 544.0],
        "timestamp": 1296230.346488
      },
      {
        "idValue": 152,
        "sample": [287.0, 619.0],
        "timestamp": 1296230.4032301
      },
      {
        "idValue": 153,
        "sample": [270.0, 646.0],
        "timestamp": 1296230.4533432
      },
      {
        "idValue": 154,
        "sample": [255.0, 664.0],
        "timestamp": 1296230.5093648
      },
      {
        "idValue": 155,
        "sample": [219.0, 695.0],
        "timestamp": 1296230.5630945
      },
      {
        "idValue": 156,
        "sample": [167.0, 746.0],
        "timestamp": 1296230.6180666
      },
      {
        "idValue": 157,
        "sample": [127.0, 767.0],
        "timestamp": 1296230.6712379
      },
      {
        "idValue": 158,
        "sample": [120.0, 772.0],
        "timestamp": 1296230.7308799
      },
      {
        "idValue": 159,
        "sample": [120.0, 772.0],
        "timestamp": 1296230.784631
      },
      {
        "idValue": 160,
        "sample": [120.0, 772.0],
        "timestamp": 1296230.8382835
      },
      {
        "idValue": 161,
        "sample": [120.0, 772.0],
        "timestamp": 1296230.8889679
      },
      {
        "idValue": 162,
        "sample": [120.0, 772.0],
        "timestamp": 1296230.9511781
      },
      {
        "idValue": 163,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.0142316
      },
      {
        "idValue": 164,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.0833536
      },
      {
        "idValue": 165,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.1471419
      },
      {
        "idValue": 166,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.2148746
      },
      {
        "idValue": 167,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.2828702
      },
      {
        "idValue": 168,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.3564116
      },
      {
        "idValue": 169,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.4291126
      },
      {
        "idValue": 170,
        "sample": [120.0, 772.0],
        "timestamp": 1296231.4875592
      },
      {
        "idValue": 171,
        "sample": [164.0, 772.0],
        "timestamp": 1296231.5475883
      },
      {
        "idValue": 172,
        "sample": [294.0, 778.0],
        "timestamp": 1296231.6084524
      },
      {
        "idValue": 173,
        "sample": [519.0, 799.0],
        "timestamp": 1296231.6690548
      },
      {
        "idValue": 174,
        "sample": [548.0, 803.0],
        "timestamp": 1296231.7299918
      },
      {
        "idValue": 175,
        "sample": [548.0, 803.0],
        "timestamp": 1296231.7898378
      },
      {
        "idValue": 176,
        "sample": [550.0, 803.0],
        "timestamp": 1296231.8483598
      },
      {
        "idValue": 177,
        "sample": [585.0, 803.0],
        "timestamp": 1296231.9067515
      },
      {
        "idValue": 178,
        "sample": [640.0, 803.0],
        "timestamp": 1296231.9712549
      },
      {
        "idValue": 179,
        "sample": [645.0, 803.0],
        "timestamp": 1296232.0339675
      },
      {
        "idValue": 180,
        "sample": [645.0, 803.0],
        "timestamp": 1296232.0923171
      },
      {
        "idValue": 181,
        "sample": [653.0, 803.0],
        "timestamp": 1296232.1600108
      },
      {
        "idValue": 182,
        "sample": [670.0, 801.0],
        "timestamp": 1296232.224079
      },
      {
        "idValue": 183,
        "sample": [682.0, 798.0],
        "timestamp": 1296232.2843279
      },
      {
        "idValue": 184,
        "sample": [685.0, 797.0],
        "timestamp": 1296232.3472711
      },
      {
        "idValue": 185,
        "sample": [685.0, 795.0],
        "timestamp": 1296232.4309674
      },
      {
        "idValue": 186,
        "sample": [699.0, 731.0],
        "timestamp": 1296232.5123693
      },
      {
        "idValue": 187,
        "sample": [695.0, 587.0],
        "timestamp": 1296232.5920748
      },
      {
        "idValue": 188,
        "sample": [618.0, 445.0],
        "timestamp": 1296232.6710779
      },
      {
        "idValue": 189,
        "sample": [547.0, 430.0],
        "timestamp": 1296232.747599
      },
      {
        "idValue": 190,
        "sample": [407.0, 491.0],
        "timestamp": 1296232.8309976
      },
      {
        "idValue": 191,
        "sample": [127.0, 605.0],
        "timestamp": 1296232.91175
      },
      {
        "idValue": 192,
        "sample": [140.0, 478.0],
        "timestamp": 1296232.9936651
      },
      {
        "idValue": 193,
        "sample": [217.0, 313.0],
        "timestamp": 1296233.0763191
      },
      {
        "idValue": 194,
        "sample": [354.0, 214.0],
        "timestamp": 1296233.1498325
      },
      {
        "idValue": 195,
        "sample": [510.0, 216.0],
        "timestamp": 1296233.2221558
      },
      {
        "idValue": 196,
        "sample": [577.0, 281.0],
        "timestamp": 1296233.2914392
      },
      {
        "idValue": 197,
        "sample": [584.0, 430.0],
        "timestamp": 1296233.3643682
      },
      {
        "idValue": 198,
        "sample": [557.0, 498.0],
        "timestamp": 1296233.4306958
      },
      {
        "idValue": 199,
        "sample": [548.0, 508.0],
        "timestamp": 1296233.48296
      }
    ]
  },
  {
    "name": "Pulsacion tecla",
    "descripcion": "Pulsacion tecla 'w' en el teclado",
    "signalID": 1,
    "labels": [
      {
        "labelId": 0,
        "name": "value 0",
        "value": "Keyboard press"
      }
    ],
    "values": [
      {
        "idValue": 0,
        "sample": [1.0],
        "timestamp": 1296216.4172344
      },
      {
        "idValue": 1,
        "sample": [0.0],
        "timestamp": 1296220.8877743
      },
      {
        "idValue": 2,
        "sample": [0.0],
        "timestamp": 1296220.9409996
      },
      {
        "idValue": 3,
        "sample": [0.0],
        "timestamp": 1296220.9923911
      },
      {
        "idValue": 4,
        "sample": [0.0],
        "timestamp": 1296221.0439831
      },
      {
        "idValue": 5,
        "sample": [0.0],
        "timestamp": 1296221.0918747
      },
      {
        "idValue": 6,
        "sample": [0.0],
        "timestamp": 1296221.1367712
      },
      {
        "idValue": 7,
        "sample": [0.0],
        "timestamp": 1296221.1855403
      },
      {
        "idValue": 8,
        "sample": [0.0],
        "timestamp": 1296221.2348449
      },
      {
        "idValue": 9,
        "sample": [0.0],
        "timestamp": 1296221.2837833
      },
      {
        "idValue": 10,
        "sample": [0.0],
        "timestamp": 1296221.3334545
      },
      {
        "idValue": 11,
        "sample": [0.0],
        "timestamp": 1296221.3821455
      },
      {
        "idValue": 12,
        "sample": [0.0],
        "timestamp": 1296221.4287852
      },
      {
        "idValue": 13,
        "sample": [0.0],
        "timestamp": 1296221.4778429
      },
      {
        "idValue": 14,
        "sample": [0.0],
        "timestamp": 1296221.524202
      },
      {
        "idValue": 15,
        "sample": [0.0],
        "timestamp": 1296221.5696404
      },
      {
        "idValue": 16,
        "sample": [0.0],
        "timestamp": 1296221.6275695
      },
      {
        "idValue": 17,
        "sample": [0.0],
        "timestamp": 1296221.6869261
      },
      {
        "idValue": 18,
        "sample": [0.0],
        "timestamp": 1296221.7503449
      },
      {
        "idValue": 19,
        "sample": [0.0],
        "timestamp": 1296221.8000145
      },
      {
        "idValue": 20,
        "sample": [0.0],
        "timestamp": 1296221.8553731
      },
      {
        "idValue": 21,
        "sample": [0.0],
        "timestamp": 1296221.9048439
      },
      {
        "idValue": 22,
        "sample": [0.0],
        "timestamp": 1296221.9582304
      },
      {
        "idValue": 23,
        "sample": [0.0],
        "timestamp": 1296222.0087187
      },
      {
        "idValue": 24,
        "sample": [0.0],
        "timestamp": 1296222.0597892
      },
      {
        "idValue": 25,
        "sample": [0.0],
        "timestamp": 1296222.1070929
      },
      {
        "idValue": 26,
        "sample": [0.0],
        "timestamp": 1296222.1560784
      },
      {
        "idValue": 27,
        "sample": [0.0],
        "timestamp": 1296222.2061647
      },
      {
        "idValue": 28,
        "sample": [1.0],
        "timestamp": 1296222.2540051
      },
      {
        "idValue": 29,
        "sample": [1.0],
        "timestamp": 1296222.3126068
      },
      {
        "idValue": 30,
        "sample": [1.0],
        "timestamp": 1296222.378656
      },
      {
        "idValue": 31,
        "sample": [1.0],
        "timestamp": 1296222.435335
      },
      {
        "idValue": 32,
        "sample": [0.0],
        "timestamp": 1296222.5017074
      },
      {
        "idValue": 33,
        "sample": [0.0],
        "timestamp": 1296222.5555235
      },
      {
        "idValue": 34,
        "sample": [0.0],
        "timestamp": 1296222.6179845
      },
      {
        "idValue": 35,
        "sample": [0.0],
        "timestamp": 1296222.6757525
      },
      {
        "idValue": 36,
        "sample": [0.0],
        "timestamp": 1296222.7395237
      },
      {
        "idValue": 37,
        "sample": [0.0],
        "timestamp": 1296222.7926528
      },
      {
        "idValue": 38,
        "sample": [0.0],
        "timestamp": 1296222.8499768
      },
      {
        "idValue": 39,
        "sample": [0.0],
        "timestamp": 1296222.9026558
      },
      {
        "idValue": 40,
        "sample": [1.0],
        "timestamp": 1296222.9586038
      },
      {
        "idValue": 41,
        "sample": [1.0],
        "timestamp": 1296223.0187458
      },
      {
        "idValue": 42,
        "sample": [1.0],
        "timestamp": 1296223.092305
      },
      {
        "idValue": 43,
        "sample": [1.0],
        "timestamp": 1296223.1523396
      },
      {
        "idValue": 44,
        "sample": [1.0],
        "timestamp": 1296223.2143576
      },
      {
        "idValue": 45,
        "sample": [1.0],
        "timestamp": 1296223.2783665
      },
      {
        "idValue": 46,
        "sample": [1.0],
        "timestamp": 1296223.3484295
      },
      {
        "idValue": 47,
        "sample": [1.0],
        "timestamp": 1296223.4109825
      },
      {
        "idValue": 48,
        "sample": [1.0],
        "timestamp": 1296223.4780609
      },
      {
        "idValue": 49,
        "sample": [1.0],
        "timestamp": 1296223.5407958
      },
      {
        "idValue": 50,
        "sample": [1.0],
        "timestamp": 1296223.6133267
      },
      {
        "idValue": 51,
        "sample": [1.0],
        "timestamp": 1296223.6827946
      },
      {
        "idValue": 52,
        "sample": [0.0],
        "timestamp": 1296223.7606549
      },
      {
        "idValue": 53,
        "sample": [0.0],
        "timestamp": 1296223.8170227
      },
      {
        "idValue": 54,
        "sample": [0.0],
        "timestamp": 1296223.8757339
      },
      {
        "idValue": 55,
        "sample": [0.0],
        "timestamp": 1296223.9271168
      },
      {
        "idValue": 56,
        "sample": [0.0],
        "timestamp": 1296223.9826173
      },
      {
        "idValue": 57,
        "sample": [0.0],
        "timestamp": 1296224.0380314
      },
      {
        "idValue": 58,
        "sample": [0.0],
        "timestamp": 1296224.0981764
      },
      {
        "idValue": 59,
        "sample": [1.0],
        "timestamp": 1296224.1645815
      },
      {
        "idValue": 60,
        "sample": [1.0],
        "timestamp": 1296224.2327897
      },
      {
        "idValue": 61,
        "sample": [1.0],
        "timestamp": 1296224.3007204
      },
      {
        "idValue": 62,
        "sample": [0.0],
        "timestamp": 1296224.3774032
      },
      {
        "idValue": 63,
        "sample": [0.0],
        "timestamp": 1296224.4361128
      },
      {
        "idValue": 64,
        "sample": [0.0],
        "timestamp": 1296224.5052757
      },
      {
        "idValue": 65,
        "sample": [0.0],
        "timestamp": 1296224.5619056
      },
      {
        "idValue": 66,
        "sample": [0.0],
        "timestamp": 1296224.6206021
      },
      {
        "idValue": 67,
        "sample": [1.0],
        "timestamp": 1296224.6741333
      },
      {
        "idValue": 68,
        "sample": [1.0],
        "timestamp": 1296224.7405053
      },
      {
        "idValue": 69,
        "sample": [1.0],
        "timestamp": 1296224.8109284
      },
      {
        "idValue": 70,
        "sample": [1.0],
        "timestamp": 1296224.8761343
      },
      {
        "idValue": 71,
        "sample": [1.0],
        "timestamp": 1296224.9453156
      },
      {
        "idValue": 72,
        "sample": [1.0],
        "timestamp": 1296225.0125513
      },
      {
        "idValue": 73,
        "sample": [1.0],
        "timestamp": 1296225.079053
      },
      {
        "idValue": 74,
        "sample": [1.0],
        "timestamp": 1296225.1608944
      },
      {
        "idValue": 75,
        "sample": [1.0],
        "timestamp": 1296225.2305524
      },
      {
        "idValue": 76,
        "sample": [1.0],
        "timestamp": 1296225.2988146
      },
      {
        "idValue": 77,
        "sample": [1.0],
        "timestamp": 1296225.3624336
      },
      {
        "idValue": 78,
        "sample": [1.0],
        "timestamp": 1296225.4291653
      },
      {
        "idValue": 79,
        "sample": [0.0],
        "timestamp": 1296225.4926066
      },
      {
        "idValue": 80,
        "sample": [0.0],
        "timestamp": 1296225.5518237
      },
      {
        "idValue": 81,
        "sample": [0.0],
        "timestamp": 1296225.620393
      },
      {
        "idValue": 82,
        "sample": [0.0],
        "timestamp": 1296225.6832191
      },
      {
        "idValue": 83,
        "sample": [0.0],
        "timestamp": 1296225.7416151
      },
      {
        "idValue": 84,
        "sample": [0.0],
        "timestamp": 1296225.8007615
      },
      {
        "idValue": 85,
        "sample": [1.0],
        "timestamp": 1296225.8601601
      },
      {
        "idValue": 86,
        "sample": [1.0],
        "timestamp": 1296225.9303573
      },
      {
        "idValue": 87,
        "sample": [1.0],
        "timestamp": 1296226.0073292
      },
      {
        "idValue": 88,
        "sample": [1.0],
        "timestamp": 1296226.0839215
      },
      {
        "idValue": 89,
        "sample": [1.0],
        "timestamp": 1296226.1580628
      },
      {
        "idValue": 90,
        "sample": [1.0],
        "timestamp": 1296226.2387941
      },
      {
        "idValue": 91,
        "sample": [1.0],
        "timestamp": 1296226.3168315
      },
      {
        "idValue": 92,
        "sample": [1.0],
        "timestamp": 1296226.3879114
      },
      {
        "idValue": 93,
        "sample": [1.0],
        "timestamp": 1296226.453688
      },
      {
        "idValue": 94,
        "sample": [1.0],
        "timestamp": 1296226.5269746
      },
      {
        "idValue": 95,
        "sample": [1.0],
        "timestamp": 1296226.590648
      },
      {
        "idValue": 96,
        "sample": [1.0],
        "timestamp": 1296226.6684567
      },
      {
        "idValue": 97,
        "sample": [1.0],
        "timestamp": 1296226.7398033
      },
      {
        "idValue": 98,
        "sample": [1.0],
        "timestamp": 1296226.8176328
      },
      {
        "idValue": 99,
        "sample": [1.0],
        "timestamp": 1296226.8859187
      },
      {
        "idValue": 100,
        "sample": [1.0],
        "timestamp": 1296226.9597752
      },
      {
        "idValue": 101,
        "sample": [1.0],
        "timestamp": 1296227.0240155
      },
      {
        "idValue": 102,
        "sample": [1.0],
        "timestamp": 1296227.0931468
      },
      {
        "idValue": 103,
        "sample": [1.0],
        "timestamp": 1296227.1619476
      },
      {
        "idValue": 104,
        "sample": [1.0],
        "timestamp": 1296227.2396426
      },
      {
        "idValue": 105,
        "sample": [1.0],
        "timestamp": 1296227.3078468
      },
      {
        "idValue": 106,
        "sample": [1.0],
        "timestamp": 1296227.3797648
      },
      {
        "idValue": 107,
        "sample": [1.0],
        "timestamp": 1296227.4427572
      },
      {
        "idValue": 108,
        "sample": [1.0],
        "timestamp": 1296227.5224005
      },
      {
        "idValue": 109,
        "sample": [1.0],
        "timestamp": 1296227.5966659
      },
      {
        "idValue": 110,
        "sample": [1.0],
        "timestamp": 1296227.6621158
      },
      {
        "idValue": 111,
        "sample": [1.0],
        "timestamp": 1296227.7253455
      },
      {
        "idValue": 112,
        "sample": [1.0],
        "timestamp": 1296227.7988948
      },
      {
        "idValue": 113,
        "sample": [1.0],
        "timestamp": 1296227.8605419
      },
      {
        "idValue": 114,
        "sample": [1.0],
        "timestamp": 1296227.9257963
      },
      {
        "idValue": 115,
        "sample": [1.0],
        "timestamp": 1296228.0000202
      },
      {
        "idValue": 116,
        "sample": [1.0],
        "timestamp": 1296228.0654667
      },
      {
        "idValue": 117,
        "sample": [1.0],
        "timestamp": 1296228.1306146
      },
      {
        "idValue": 118,
        "sample": [1.0],
        "timestamp": 1296228.2019963
      },
      {
        "idValue": 119,
        "sample": [1.0],
        "timestamp": 1296228.2708954
      },
      {
        "idValue": 120,
        "sample": [1.0],
        "timestamp": 1296228.3511838
      },
      {
        "idValue": 121,
        "sample": [1.0],
        "timestamp": 1296228.4225946
      },
      {
        "idValue": 122,
        "sample": [1.0],
        "timestamp": 1296228.5008942
      },
      {
        "idValue": 123,
        "sample": [1.0],
        "timestamp": 1296228.5717603
      },
      {
        "idValue": 124,
        "sample": [1.0],
        "timestamp": 1296228.6471236
      },
      {
        "idValue": 125,
        "sample": [1.0],
        "timestamp": 1296228.7153906
      },
      {
        "idValue": 126,
        "sample": [1.0],
        "timestamp": 1296228.7862406
      },
      {
        "idValue": 127,
        "sample": [1.0],
        "timestamp": 1296228.8595448
      },
      {
        "idValue": 128,
        "sample": [1.0],
        "timestamp": 1296228.9349287
      },
      {
        "idValue": 129,
        "sample": [0.0],
        "timestamp": 1296229.0051107
      },
      {
        "idValue": 130,
        "sample": [0.0],
        "timestamp": 1296229.0689615
      },
      {
        "idValue": 131,
        "sample": [0.0],
        "timestamp": 1296229.1251616
      },
      {
        "idValue": 132,
        "sample": [0.0],
        "timestamp": 1296229.1932396
      },
      {
        "idValue": 133,
        "sample": [0.0],
        "timestamp": 1296229.2596028
      },
      {
        "idValue": 134,
        "sample": [0.0],
        "timestamp": 1296229.3243812
      },
      {
        "idValue": 135,
        "sample": [0.0],
        "timestamp": 1296229.387784
      },
      {
        "idValue": 136,
        "sample": [0.0],
        "timestamp": 1296229.4569058
      },
      {
        "idValue": 137,
        "sample": [0.0],
        "timestamp": 1296229.5263229
      },
      {
        "idValue": 138,
        "sample": [0.0],
        "timestamp": 1296229.5873789
      },
      {
        "idValue": 139,
        "sample": [0.0],
        "timestamp": 1296229.6436719
      },
      {
        "idValue": 140,
        "sample": [1.0],
        "timestamp": 1296229.7025837
      },
      {
        "idValue": 141,
        "sample": [1.0],
        "timestamp": 1296229.7695549
      },
      {
        "idValue": 142,
        "sample": [1.0],
        "timestamp": 1296229.8383818
      },
      {
        "idValue": 143,
        "sample": [0.0],
        "timestamp": 1296229.9046747
      },
      {
        "idValue": 144,
        "sample": [0.0],
        "timestamp": 1296229.9624559
      },
      {
        "idValue": 145,
        "sample": [0.0],
        "timestamp": 1296230.020216
      },
      {
        "idValue": 146,
        "sample": [0.0],
        "timestamp": 1296230.0756536
      },
      {
        "idValue": 147,
        "sample": [0.0],
        "timestamp": 1296230.1305112
      },
      {
        "idValue": 148,
        "sample": [0.0],
        "timestamp": 1296230.1824979
      },
      {
        "idValue": 149,
        "sample": [0.0],
        "timestamp": 1296230.2335716
      },
      {
        "idValue": 150,
        "sample": [0.0],
        "timestamp": 1296230.2868467
      },
      {
        "idValue": 151,
        "sample": [0.0],
        "timestamp": 1296230.346314
      },
      {
        "idValue": 152,
        "sample": [0.0],
        "timestamp": 1296230.4030356
      },
      {
        "idValue": 153,
        "sample": [0.0],
        "timestamp": 1296230.4531332
      },
      {
        "idValue": 154,
        "sample": [0.0],
        "timestamp": 1296230.5091816
      },
      {
        "idValue": 155,
        "sample": [0.0],
        "timestamp": 1296230.5628758
      },
      {
        "idValue": 156,
        "sample": [0.0],
        "timestamp": 1296230.6178727
      },
      {
        "idValue": 157,
        "sample": [0.0],
        "timestamp": 1296230.6710789
      },
      {
        "idValue": 158,
        "sample": [0.0],
        "timestamp": 1296230.7307144
      },
      {
        "idValue": 159,
        "sample": [0.0],
        "timestamp": 1296230.7844149
      },
      {
        "idValue": 160,
        "sample": [0.0],
        "timestamp": 1296230.8381243
      },
      {
        "idValue": 161,
        "sample": [1.0],
        "timestamp": 1296230.888884
      },
      {
        "idValue": 162,
        "sample": [1.0],
        "timestamp": 1296230.9510708
      },
      {
        "idValue": 163,
        "sample": [1.0],
        "timestamp": 1296231.0141591
      },
      {
        "idValue": 164,
        "sample": [1.0],
        "timestamp": 1296231.0832655
      },
      {
        "idValue": 165,
        "sample": [1.0],
        "timestamp": 1296231.1470637
      },
      {
        "idValue": 166,
        "sample": [1.0],
        "timestamp": 1296231.2147916
      },
      {
        "idValue": 167,
        "sample": [1.0],
        "timestamp": 1296231.2827592
      },
      {
        "idValue": 168,
        "sample": [1.0],
        "timestamp": 1296231.3563366
      },
      {
        "idValue": 169,
        "sample": [0.0],
        "timestamp": 1296231.4290123
      },
      {
        "idValue": 170,
        "sample": [0.0],
        "timestamp": 1296231.4874031
      },
      {
        "idValue": 171,
        "sample": [0.0],
        "timestamp": 1296231.5474153
      },
      {
        "idValue": 172,
        "sample": [0.0],
        "timestamp": 1296231.6083197
      },
      {
        "idValue": 173,
        "sample": [0.0],
        "timestamp": 1296231.6689013
      },
      {
        "idValue": 174,
        "sample": [0.0],
        "timestamp": 1296231.7298257
      },
      {
        "idValue": 175,
        "sample": [0.0],
        "timestamp": 1296231.7896879
      },
      {
        "idValue": 176,
        "sample": [0.0],
        "timestamp": 1296231.8482257
      },
      {
        "idValue": 177,
        "sample": [0.0],
        "timestamp": 1296231.9065844
      },
      {
        "idValue": 178,
        "sample": [0.0],
        "timestamp": 1296231.9710937
      },
      {
        "idValue": 179,
        "sample": [0.0],
        "timestamp": 1296232.0337566
      },
      {
        "idValue": 180,
        "sample": [0.0],
        "timestamp": 1296232.0921392
      },
      {
        "idValue": 181,
        "sample": [0.0],
        "timestamp": 1296232.1598818
      },
      {
        "idValue": 182,
        "sample": [0.0],
        "timestamp": 1296232.2239361
      },
      {
        "idValue": 183,
        "sample": [0.0],
        "timestamp": 1296232.2841795
      },
      {
        "idValue": 184,
        "sample": [1.0],
        "timestamp": 1296232.3471903
      },
      {
        "idValue": 185,
        "sample": [1.0],
        "timestamp": 1296232.4308867
      },
      {
        "idValue": 186,
        "sample": [1.0],
        "timestamp": 1296232.5122948
      },
      {
        "idValue": 187,
        "sample": [1.0],
        "timestamp": 1296232.5920005
      },
      {
        "idValue": 188,
        "sample": [1.0],
        "timestamp": 1296232.6709328
      },
      {
        "idValue": 189,
        "sample": [1.0],
        "timestamp": 1296232.7475241
      },
      {
        "idValue": 190,
        "sample": [1.0],
        "timestamp": 1296232.830923
      },
      {
        "idValue": 191,
        "sample": [1.0],
        "timestamp": 1296232.9116717
      },
      {
        "idValue": 192,
        "sample": [1.0],
        "timestamp": 1296232.9935706
      },
      {
        "idValue": 193,
        "sample": [1.0],
        "timestamp": 1296233.0761989
      },
      {
        "idValue": 194,
        "sample": [1.0],
        "timestamp": 1296233.1497148
      },
      {
        "idValue": 195,
        "sample": [1.0],
        "timestamp": 1296233.2220793
      },
      {
        "idValue": 196,
        "sample": [1.0],
        "timestamp": 1296233.2913537
      },
      {
        "idValue": 197,
        "sample": [1.0],
        "timestamp": 1296233.3642592
      },
      {
        "idValue": 198,
        "sample": [0.0],
        "timestamp": 1296233.4306187
      },
      {
        "idValue": 199,
        "sample": [0.0],
        "timestamp": 1296233.4827941
      }
    ]
  }
]

const videos : VideoConfig[] = [
  {
    "url": "https://www.youtube.com/watch?v=OlL1bDImVkM",
    "videoID": 0,
    "fps": 30
  },
  {
    "url": "https://www.youtube.com/watch?v=OlL1bDImVkM",
    "videoID": 0,
    "fps": 30
  },
  {
    "url": "https://www.youtube.com/watch?v=OlL1bDImVkM",
    "videoID": 0,
    "fps": 30
  },
  {
    "url": "https://www.youtube.com/watch?v=OlL1bDImVkM",
    "videoID": 0,
    "fps": 30
  }
]

const markers : Marker[] = [
    {
      "id": 1,
      "time": 29.088302,
      "title": "Marker 1"
    },
    {
      "id": 2,
      "time": 140.60118801716615,
      "title": "Marker 2"
    },
    {
      "id": 3,
      "time": 184.6761849485016,
      "title": "Marker 3"
    },
    {
      "id": 4,
      "time": 238.24464292752074,
      "title": "Marker 4"
    },
  ]


const session1 : SessionUser = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Session 1',
  dateCreation: new Date(),
  signals: signals,
  videos: videos,
  markers: markers
};

const user: User = {
  email: 'raul@gmail.com',
  password: '1234',
  name: 'Raul',
  surname: 'Arroyo',
  sessionUser: session1._id,
};

const userProjection = {
  email: true,
  name: true,
  surname: true,
  sessionUser: true,
}

const sessionProjection = {
  description: true,
  dateCreation: true,
  // signals: true,
  // videos: true,
  // markers: true,
}

const signalsProjection = {
  name: true,
  descripcion: true
}

dotenv.config({ path: `.env.local`, override: true });
const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  const opts = {
    bufferCommands: false,
  };
  const conn = await mongoose.connect(MONGODB_URI, opts);
  //await conn.connection.db.dropDatabase();

  //COMENTARIO: ESTO ES PARA CREAR UN USUARIO
  //const res1 = await SessionUsers.create(session1);
  //const res = await Users.create(user);
  //   console.log(JSON.stringify(res, null, 2));

  const retrievedUsers = await Users.find()
  console.log(JSON.stringify(retrievedUsers, null, 2));

  const retrievedSession = await SessionUsers.findOne({description: "Session 1"}, sessionProjection)//.populate('signals', signalsProjection)
  console.log(JSON.stringify(retrievedSession, null, 2));

  //COMENTARIO: ESTO ES PARA BUSCAR UN USUARIO POR ID
  // const retrievedUserById = await Users.findById('66376e20f09907e548ef7d53');
  // console.log(JSON.stringify(retrievedUserById, null, 2));
  
  // const retrievedUsersByCriteria = await Users.find({
  //   email: 'raul@gmail.com',
  // });
  // console.log(JSON.stringify(retrievedUsersByCriteria, null, 2));

  // const deletedUser = await Users.deleteOne({ email: 'raul@gmail.com' });
  // console.log(JSON.stringify(deletedUser, null, 2));

  //COMENTARIO: ESTO ES PARA BUSCAR UN USUARIO Y CAMBIARLE EL NOMBRE
  // const retrievedUserByCriteria = await Users.findOne({
  //      email: 'raul@gmail.com',
  //    });
  //    console.log(JSON.stringify(retrievedUserByCriteria, null, 2));
     
  //    retrievedUserByCriteria.name = 'Raul';
  //    await retrievedUserByCriteria.save();
     
  //    const retrievedNewUserByCriteria = await Users.findOne({
  //      email: 'raul@gmail.com',
  //    });
  //    console.log(JSON.stringify(retrievedNewUserByCriteria, null, 2));

  await conn.disconnect();
}

seed().catch(console.error);
