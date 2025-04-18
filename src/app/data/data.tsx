import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchPanels } from "../slices/panelSlice";
import { fetchMaterials } from "../slices/materialSlice";
import { fetchsizes } from "../slices/sizeSlice";
import { Accessories, fetchAccessories } from "../slices/accessoriesSlice";
import { Color, fetchColor } from "../slices/colorSlice";
import { useEffect } from "react";

export interface Panel {
  _id: string;
  panel: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Size {
  _id: string;
  size: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Material {
  _id: string;
  material: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const colorMap: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Grey: "#a8a8a8",
  "Royal Blue": "#4b4c8c",
  Gold: "#c4ac7c",
  "Light Gray": "#d3d3d3",
  Silver: "#dddddd",
  "Rose Gold": "#b76e79",
  Chrome: "#d8dbde",
};

export const useStepsData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const panels = useSelector((state: RootState) => state.panel.panels);
  const material = useSelector((state: RootState) => state.material.materials);
  const size = useSelector((state: RootState) => state.size.sizes);
  const accessories = useSelector(
    (state: RootState) => state.accessories.accessories,
  );
  const color = useSelector((state: RootState) => state.color.color);

  useEffect(() => {
    void dispatch(fetchPanels());
    void dispatch(fetchMaterials());
    void dispatch(fetchsizes());
    void dispatch(fetchAccessories());
    void dispatch(fetchColor());
  }, [dispatch]);

  const stepsData = [
    {
      stepNo: 1,
      step: "Panel",
      description: "Create your own panel",
      options: panels.map((p, i) => ({
        [`Panel ${i + 1}`]: p.panel,
        id: p._id,
        price: p.price,
      })),
    },
    {
      stepNo: 2,
      step: "Material",
      description: "Material",
      //   options: [
      //     { "Material 1": "Glass", id: "5", price: 100 },
      //     { "Material 2": "", id: "6", price: 100 },
      //   ],
      options: material.map((m, i) => ({
        [`Material ${i + 1}`]: m.material,
        id: m._id,
        price: m.price,
      })),
    },
    {
      stepNo: 3,
      step: "Size",
      description: "Size",
      options: size.map((s, i) => ({
        [`Size ${i + 1}`]: s.size,
        id: s._id,
        price: s.price,
      })),
    },
    // {
    //   stepNo: 4,
    //   step: "Accessories",
    //   description: "Accessories",
    //   optionTypes: ["2 Modular", "4 Modular", "6 Modular", "8 Modular"],
    //   optionsData: [
    //     {
    //       optionType: "2 Modular",
    //       options: [
    //         { "2 Modular": "2 Switch", id: "12", price: 2200 },
    //         { "2 Modular": "2 Switch(1-16A)", id: "13", price: 100 },
    //         { "2 Modular": "2 Switch(1-2 way)", id: "14", price: 100 },
    //         { "2 Modular": "2 Switch(2-16A)", id: "15", price: 100 },
    //         { "2 Modular": "Bell", id: "16", price: 1100 },
    //         { "2 Modular": "Curtain", id: "17", price: 2300 },
    //         { "2 Modular": "3 Pin Socket", id: "18", price: 100 },
    //         { "2 Modular": "2 Dimmer(Phase Cut)", id: "19", price: 3000 },
    //         { "2 Modular": "4 Scene Controller", id: "20", price: 2400 },
    //       ],
    //     },
    //     {
    //       optionType: "4 Modular",
    //       options: [
    //         { "4 Modular": "4 Switch", id: "21", price: 3350 },
    //         { "4 Modular": "4 Switch + 1 Fan", id: "22", price: 4850 },
    //         { "4 Modular": "6 Switch", id: "23", price: 4400 },
    //       ],
    //     },
    //     {
    //       optionType: "6 Modular",
    //       options: [
    //         { "6 Modular": "8 Switch", id: "24", price: 5450 },
    //         { "6 Modular": "6 Switch + 1 Fan", id: "25", price: 6000 },
    //         { "6 Modular": "4 Switch + 2 Fan", id: "26", price: 6300 },
    //       ],
    //     },
    //     {
    //       optionType: "8 Modular",
    //       options: [
    //         { "8 Modular": "10 Switch", id: "27", price: 6500 },
    //         { "8 Modular": "6 Switch + 2 Fan", id: "28", price: 7400 },
    //       ],
    //     },
    //   ],
    // },
    {
      stepNo: 4,
      step: "Accessories",
      description: "Accessories",
      optionTypes: accessories.map((a) => a.modularType),
      optionsData: accessories.map((a) => ({
        optionType: a.modularType,
        options: a.subModules.map((sub) => ({
          [a.modularType]: sub.name,
          id: sub._id,
          price: sub.price,
        })),
      })),
    },
    {
      stepNo: 5,
      step: "Icons",
      description: "Icons",
      optionTypes: [
        "Decorative Lights",
        "Home Appliances",
        "Scene",
        "Necessity",
        "Light",
        "COB Lighting",
        "Socket",
        "Fan",
        "BLDC Fan",
        "Light Dimmer",
        "Numbers",
      ],
      optionsData: [
        {
          optionType: "Decorative Lights",
          // options: [
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/1.png', 'id': '1000', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/2.png', 'id': '1001', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/3.png', 'id': '1002', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL.png', 'id': '1003', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL10.png', 'id': '1004', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL11.png', 'id': '1005', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL12.png', 'id': '1006', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL13.png', 'id': '1007', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL14.png', 'id': '1008', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL15.png', 'id': '1009', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL16.png', 'id': '1010', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL17.png', 'id': '1011', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL18.png', 'id': '1012', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL2.png', 'id': '1013', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL3.png', 'id': '1014', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL4.png', 'id': '1015', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL5.png', 'id': '1016', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL6.png', 'id': '1017', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL7.png', 'id': '1018', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL8.png', 'id': '1019', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/HL9.png', 'id': '1020', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/Security Camera 1.png', 'id': '1021', 'price': 100 },
          //     { 'Decorative Lights': '/icon/Icons80x80px/Decorative Lights/Security Camera.png', 'id': '1022', 'price': 100 }
          // ]

          options: [
            {
              "Decorative Lights": "/icon/Icons80x80px/Decorative Lights/1.svg",
              id: "1000",
              price: 100,
            },
            {
              "Decorative Lights": "/icon/Icons80x80px/Decorative Lights/2.svg",
              id: "1001",
              price: 100,
            },
            {
              "Decorative Lights": "/icon/Icons80x80px/Decorative Lights/3.svg",
              id: "1002",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL.svg",
              id: "1003",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL10.svg",
              id: "1004",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL11.svg",
              id: "1005",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL12.svg",
              id: "1006",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL14.svg",
              id: "1008",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL15.svg",
              id: "1009",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL16.svg",
              id: "1010",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL17.svg",
              id: "1011",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL18.svg",
              id: "1012",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL2.svg",
              id: "1013",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL3.svg",
              id: "1014",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL4.svg",
              id: "1015",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL5.svg",
              id: "1016",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL7.svg",
              id: "1018",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL8.svg",
              id: "1019",
              price: 100,
            },
            {
              "Decorative Lights":
                "/icon/Icons80x80px/Decorative Lights/HL9.svg",
              id: "1020",
              price: 100,
            },
          ],
        },
        {
          optionType: "Home Appliances",
          // options: [
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/101.svg', 'id': '1100', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/10.svg', 'id': '1101', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/11.svg', 'id': '1102', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/12.svg', 'id': '1103', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/13.svg', 'id': '1104', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/14.svg', 'id': '1105', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/15.svg', 'id': '1106', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/16.svg', 'id': '1107', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/17.svg', 'id': '1108', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/18.svg', 'id': '1109', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/19.svg', 'id': '1110', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/2.svg', 'id': '1111', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/2Way.svg', 'id': '1112', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/3.svg', 'id': '1113', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/4.svg', 'id': '1114', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/5.svg', 'id': '1115', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/6.svg', 'id': '1116', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/7.svg', 'id': '1117', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/8.svg', 'id': '1118', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/9.svg', 'id': '1119', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-100.svg', 'id': '1120', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-101.svg', 'id': '1121', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-102.svg', 'id': '1122', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-103.svg', 'id': '1123', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-104.svg', 'id': '1124', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-105.svg', 'id': '1125', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-106.svg', 'id': '1126', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-91.svg', 'id': '1127', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-92.svg', 'id': '1128', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-93.svg', 'id': '1129', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-94.svg', 'id': '1130', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-95.svg', 'id': '1131', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-96.svg', 'id': '1132', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-97.svg', 'id': '1133', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-98.svg', 'id': '1134', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Appliances-99.svg', 'id': '1135', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Dinner.svg', 'id': '1136', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Home1.svg', 'id': '1137', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Home2.svg', 'id': '1138', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Music.svg', 'id': '1139', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Night Mode.svg', 'id': '1140', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Play.svg', 'id': '1141', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Power.svg', 'id': '1142', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Reading.svg', 'id': '1143', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Tea.svg', 'id': '1144', 'price': 100 },
          //     { 'Home Appliances': '/icon/Icons80x80px/Home Appliances/Temperature.svg', 'id': '1145', 'price': 100 }
          // ]

          options: [
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/101.svg",
              id: "1100",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/102.svg",
              id: "1101",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/103.svg",
              id: "1102",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/104.svg",
              id: "1103",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/105.svg",
              id: "1104",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/106.svg",
              id: "1105",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/107.svg",
              id: "1106",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/108.svg",
              id: "1107",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/109.svg",
              id: "1108",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/110.svg",
              id: "1109",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/111.svg",
              id: "1110",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/112.svg",
              id: "1111",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/113.svg",
              id: "1112",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/114.svg",
              id: "1113",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/115.svg",
              id: "1114",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/116.svg",
              id: "1115",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/117.svg",
              id: "1116",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/118.svg",
              id: "1117",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/119.svg",
              id: "1118",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/120.svg",
              id: "1119",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/221.svg",
              id: "1120",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/222.svg",
              id: "1121",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/223.svg",
              id: "1122",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/224.svg",
              id: "1123",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/225.svg",
              id: "1124",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/226.svg",
              id: "1125",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/227.svg",
              id: "1126",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/228.svg",
              id: "1127",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/229.svg",
              id: "1128",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/230.svg",
              id: "1129",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/231.svg",
              id: "1130",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/232.svg",
              id: "1131",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/233.svg",
              id: "1132",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/234.svg",
              id: "1133",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/235.svg",
              id: "1134",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/236.svg",
              id: "1135",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/238.svg",
              id: "1136",
              price: 100,
            },
            {
              "Home Appliances": "/icon/Icons80x80px/Home Appliances/239.svg",
              id: "1137",
              price: 100,
            },
          ],
        },
        {
          optionType: "Scene",
          // options: [
          //     { 'Scene': '/icon/Icons80x80px/Scene/81.svg', 'id': '1200', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/2.svg', 'id': '1201', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/3.svg', 'id': '1202', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/4.svg', 'id': '1203', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/5.svg', 'id': '1204', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/6.svg', 'id': '1205', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/7.svg', 'id': '1206', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/8.svg', 'id': '1207', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/9.svg', 'id': '1208', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/10.svg', 'id': '1209', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/11.svg', 'id': '1210', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/12.svg', 'id': '1211', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-71.svg', 'id': '1212', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-72.svg', 'id': '1213', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-73.svg', 'id': '1214', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-74.svg', 'id': '1215', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-75.svg', 'id': '1216', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-76.svg', 'id': '1217', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-77.svg', 'id': '1218', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-78.svg', 'id': '1219', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-79.svg', 'id': '1220', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-80.svg', 'id': '1221', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-81.svg', 'id': '1222', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-82.svg', 'id': '1223', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-83.svg', 'id': '1224', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-84.svg', 'id': '1225', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-85.svg', 'id': '1226', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-86.svg', 'id': '1227', 'price': 100 },
          //     { 'Scene': '/icon/Icons80x80px/Scene/Scene-87.svg', 'id': '1228', 'price': 100 }
          // ]
          options: [
            {
              Scene: "/icon/Icons80x80px/Scene/100.svg",
              id: "1200",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/201.svg",
              id: "1201",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/202.svg",
              id: "1202",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/203.svg",
              id: "1203",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/204.svg",
              id: "1204",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/205.svg",
              id: "1205",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/206.svg",
              id: "1206",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/207.svg",
              id: "1207",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/208.svg",
              id: "1208",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/209.svg",
              id: "1209",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/81.svg",
              id: "1210",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/82.svg",
              id: "1211",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/83.svg",
              id: "1212",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/84.svg",
              id: "1213",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/85.svg",
              id: "1214",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/86.svg",
              id: "1215",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/87.svg",
              id: "1216",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/88.svg",
              id: "1217",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/90.svg",
              id: "1218",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/91.svg",
              id: "1219",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/93.svg",
              id: "1220",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/94.svg",
              id: "1221",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/95.svg",
              id: "1222",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/96.svg",
              id: "1223",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/97.svg",
              id: "1224",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/98.svg",
              id: "1225",
              price: 100,
            },
            {
              Scene: "/icon/Icons80x80px/Scene/99.svg",
              id: "1226",
              price: 100,
            },
          ],
        },
        {
          optionType: "Necessity",
          // options: [
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/AC.svg', 'id': '1300', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/AC2.svg', 'id': '1301', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Coffee Mixer.svg', 'id': '1302', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Cooking Cooker.svg', 'id': '1303', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Fridge.svg', 'id': '1304', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Geyser.svg', 'id': '1305', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Hair Dryer.svg', 'id': '1306', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Kettle.svg', 'id': '1307', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Mixer.svg', 'id': '1308', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Mixer3.svg', 'id': '1309', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Mixer4.svg', 'id': '1310', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Oven2.svg', 'id': '1311', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Radio.svg', 'id': '1312', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Toaster.svg', 'id': '1313', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/TV.svg', 'id': '1314', 'price': 100 },
          //     { 'Necessity': '/icon/Icons80x80px/Neccesities/Washing Machine.svg', 'id': '1315', 'price': 100 }
          // ]
          options: [
            {
              Necessity: "/icon/Icons80x80px/Neccesities/p10.svg",
              id: "1300",
              price: 100,
            },
            {
              Necessity: "/icon/Icons80x80px/Neccesities/p11.svg",
              id: "1301",
              price: 100,
            },
            {
              Necessity: "/icon/Icons80x80px/Neccesities/p8.svg",
              id: "1302",
              price: 100,
            },
            {
              Necessity: "/icon/Icons80x80px/Neccesities/p9.svg",
              id: "1303",
              price: 100,
            },
          ],
        },
        {
          optionType: "Light",
          // options: [
          //     { 'Light': '/icon/Icons80x80px/Light/Bulb.svg', 'id': '1400', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Bulb1.svg', 'id': '1401', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Bulb2.svg', 'id': '1402', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/HL.svg', 'id': '1403', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L1.svg', 'id': '1404', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L10.svg', 'id': '1405', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L11.svg', 'id': '1406', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L12.svg', 'id': '1407', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L13.svg', 'id': '1408', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L14.svg', 'id': '1409', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L15.svg', 'id': '1410', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L2.svg', 'id': '1411', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L3.svg', 'id': '1412', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L4.svg', 'id': '1413', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L5.svg', 'id': '1414', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L6.svg', 'id': '1415', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L7.svg', 'id': '1416', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L8.svg', 'id': '1417', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/L9.svg', 'id': '1418', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-11.svg', 'id': '1419', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-12.svg', 'id': '1420', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-13.svg', 'id': '1421', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-14.svg', 'id': '1422', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-15.svg', 'id': '1423', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-16.svg', 'id': '1424', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-17.svg', 'id': '1425', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-18.svg', 'id': '1426', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-19.svg', 'id': '1427', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-20.svg', 'id': '1428', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-21.svg', 'id': '1429', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-22.svg', 'id': '1430', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-23.svg', 'id': '1431', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-24.svg', 'id': '1432', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-25.svg', 'id': '1433', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-26.svg', 'id': '1434', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp-27.svg', 'id': '1435', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp.svg', 'id': '1436', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp2.svg', 'id': '1437', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp3.svg', 'id': '1438', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp4.svg', 'id': '1439', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Lamp5.svg', 'id': '1440', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/LB.svg', 'id': '1441', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/SB.svg', 'id': '1442', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/SL.svg', 'id': '1443', 'price': 100 },
          //     { 'Light': '/icon/Icons80x80px/Light/Study Lamp.svg', 'id': '1444', 'price': 100 }
          // ]
          options: [
            {
              Light: "/icon/Icons80x80px/Light/161.svg",
              id: "1400",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/162.svg",
              id: "1401",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/163.svg",
              id: "1402",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/164.svg",
              id: "1403",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/165.svg",
              id: "1404",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/166.svg",
              id: "1405",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/167.svg",
              id: "1406",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/168.svg",
              id: "1407",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/169.svg",
              id: "1408",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/170.svg",
              id: "1409",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/171.svg",
              id: "1410",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/172.svg",
              id: "1411",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/HL.svg",
              id: "1412",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/L13.svg",
              id: "1413",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/L14.svg",
              id: "1414",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/L15.svg",
              id: "1415",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-12.svg",
              id: "1423",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-13.svg",
              id: "1424",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-14.svg",
              id: "1425",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-15.svg",
              id: "1426",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-16.svg",
              id: "1427",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-17.svg",
              id: "1428",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-18.svg",
              id: "1429",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-19.svg",
              id: "1430",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-20.svg",
              id: "1431",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-21.svg",
              id: "1432",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-22.svg",
              id: "1433",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-23.svg",
              id: "1434",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-24.svg",
              id: "1435",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-25.svg",
              id: "1436",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-26.svg",
              id: "1437",
              price: 100,
            },
            {
              Light: "/icon/Icons80x80px/Light/Lamp-27.svg",
              id: "1438",
              price: 100,
            },
          ],
        },
        {
          optionType: "COB Lighting",
          // options: [
          //     { 'COB Lighting': '/icon/Icons80x80px/COB lighting/CL1.svg', 'id': '1500', 'price': 100 },
          //     { 'COB Lighting': '/icon/Icons80x80px/COB lighting/CL2.svg', 'id': '1501', 'price': 100 },
          //     { 'COB Lighting': '/icon/Icons80x80px/COB lighting/CL3.svg', 'id': '1502', 'price': 100 },
          // ],
          options: [
            {
              "COB Lighting": "/icon/Icons80x80px/COB lighting/CL1.png",
              id: "1500",
              price: 100,
            },
            {
              "COB Lighting": "/icon/Icons80x80px/COB lighting/CL2.png",
              id: "1501",
              price: 100,
            },
            {
              "COB Lighting": "/icon/Icons80x80px/COB lighting/CL3.png",
              id: "1502",
              price: 100,
            },
          ],
        },
        {
          optionType: "Socket",
          // options: [
          //     { 'Socket': '/icon/Icons80x80px/Socket/1.svg', 'id': '1600', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/16AMP.svg', 'id': '1601', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/2.svg', 'id': '1602', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/3.svg', 'id': '1603', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/4.svg', 'id': '1604', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/5.svg', 'id': '1605', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/6.svg', 'id': '1606', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/6AMP.svg', 'id': '1607', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/7.svg', 'id': '1608', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Accessorie-01.svg', 'id': '1609', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Accessorie-02.svg', 'id': '1610', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Accessorie-03.svg', 'id': '1611', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Accessorie-04.svg', 'id': '1612', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Accessorie-05.svg', 'id': '1613', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Accessorie-06.svg', 'id': '1614', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Accessorie-07.svg', 'id': '1615', 'price': 100 },
          //     { 'Socket': '/icon/Icons80x80px/Socket/Icon list.svg', 'id': '1616', 'price': 100 }
          // ]
          options: [
            {
              Socket: "/icon/Icons80x80px/Socket/1.svg",
              id: "1600",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/2.svg",
              id: "1601",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/3.svg",
              id: "1602",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/5.svg",
              id: "1603",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/7.svg",
              id: "1604",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/8.svg",
              id: "1605",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/9.svg",
              id: "1606",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/10.svg",
              id: "1607",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/11.svg",
              id: "1608",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/12.svg",
              id: "1609",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/Accessorie-01.svg",
              id: "1610",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/Accessorie-04.svg",
              id: "1611",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/Icon List.svg",
              id: "1612",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/page 5-12.svg",
              id: "1613",
              price: 100,
            },
            {
              Socket: "/icon/Icons80x80px/Socket/page 5-16.svg",
              id: "1614",
              price: 100,
            },
          ],
        },
        {
          optionType: "Fan",
          // options: [
          //     { 'Fan': '/icon/Icons80x80px/Fan/F1.svg', 'id': '1700', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F2.svg', 'id': '1701', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F3.svg', 'id': '1702', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F4.svg', 'id': '1703', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F5.svg', 'id': '1704', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F6.svg', 'id': '1705', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F7.svg', 'id': '1706', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F8.svg', 'id': '1707', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F9.svg', 'id': '1708', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F10.svg', 'id': '1709', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F11.svg', 'id': '1710', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F12.svg', 'id': '1711', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F13.svg', 'id': '1712', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F14.svg', 'id': '1713', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F15.svg', 'id': '1714', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F16.svg', 'id': '1715', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F17.svg', 'id': '1716', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F18.svg', 'id': '1717', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F19.svg', 'id': '1718', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F20.svg', 'id': '1719', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/F21.svg', 'id': '1720', 'price': 100 },
          //     { 'Fan': '/icon/Icons80x80px/Fan/Fan Default.svg', 'id': '1721', 'price': 100 }
          // ]
          options: [
            { Fan: "/icon/Icons80x80px/Fan/F1.svg", id: "1700", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F10.svg", id: "1701", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F11.svg", id: "1702", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F12.svg", id: "1703", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F13.svg", id: "1704", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F14.svg", id: "1705", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F15.svg", id: "1706", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F16.svg", id: "1707", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F17.svg", id: "1708", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F18.svg", id: "1709", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F19.svg", id: "1710", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F2.svg", id: "1711", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F20.svg", id: "1712", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F21.svg", id: "1713", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F3.svg", id: "1714", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F5.svg", id: "1715", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F6.svg", id: "1716", price: 100 },
            { Fan: "/icon/Icons80x80px/Fan/F8.svg", id: "1717", price: 100 },
            {
              Fan: "/icon/Icons80x80px/Fan/Fan Default.svg",
              id: "1719",
              price: 100,
            },
          ],
        },
        {
          optionType: "BLDC Fan",
          options: [
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/2.svg",
              id: "1801",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/3.svg",
              id: "1802",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/4.svg",
              id: "1803",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/5.svg",
              id: "1804",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/6.svg",
              id: "1805",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/7.svg",
              id: "1806",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/8.svg",
              id: "1807",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/9.svg",
              id: "1808",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/10.svg",
              id: "1809",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/11.svg",
              id: "1810",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/12.svg",
              id: "1811",
              price: 100,
            },
            {
              "BLDC Fan": "/icon/Icons80x80px/BLDC/13.svg",
              id: "1812",
              price: 100,
            },
          ],
        },
        // {
        //     optionType: 'Light Dimmer',
        //     options: [
        //         { 'Light Dimmer': '/icon/Icons80x80px/Dimmer/Dimmer Default.svg', 'id': '1900', 'price': 100 },
        //     ],
        // },
        {
          optionType: "Numbers",
          options: [
            {
              Numbers: "/icon/Icons80x80px/Numbers/0.png",
              id: "2000",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/0B.png",
              id: "2001",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/1.png",
              id: "2002",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/1B.png",
              id: "2003",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/2.png",
              id: "2004",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/2B.png",
              id: "2005",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/3.png",
              id: "2006",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/3B.png",
              id: "2007",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/4.png",
              id: "2008",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/4B.png",
              id: "2009",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/5.png",
              id: "2010",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/5B.png",
              id: "2011",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/6.png",
              id: "2012",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/6B.png",
              id: "2013",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/7.png",
              id: "2014",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/7B.png",
              id: "2015",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/8.png",
              id: "2016",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/8B.png",
              id: "2017",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/9.png",
              id: "2018",
              price: 100,
            },
            {
              Numbers: "/icon/Icons80x80px/Numbers/9B.png",
              id: "2019",
              price: 100,
            },
          ],
        },
      ],
    },
    {
      stepNo: 6,
      step: "Color",
      description: "Color",
      optionTypes: color.map((c) => c.modularType),
      optionsData: color.map((colorGroup) => ({
        optionType: colorGroup.modularType,
        options: colorGroup.subModules.map((sub) => ({
          [colorGroup.modularType]: sub.name,
          color: colorMap[sub.name] || "#000000",
          id: sub._id,
          price: sub.price,
        })),
      })),
    },
    {
      stepNo: 7,
      step: "Cart",
      description: "Your Cart",
    },
  ];

  return stepsData;
};
/* Object which will be send after user Add in Cart */

// export const userCart = {
//     cartData: {
//         size: {
//             id: '9',
//             item: "6 Module",
//             price: 200,
//         },
//         panel: {
//             id: '1',
//             item: "Edge",
//             price: 100,
//         },
//         material: {
//             id: '5',
//             item: "Glass",
//             price: 50,
//         },
//         accessories: [
//             {
//                 optionType: '2 Modular',
//                 options: [
//                     {
//                         id: '12',
//                         item: "2 Switch",
//                         price: 25,
//                     },
//                     {
//                         id: '17',
//                         item: "Curtain",
//                         price: 45,
//                     },
//                     {
//                         id: '20',
//                         item: "4 Scene Controller",
//                         price: 60,
//                     },
//                     {
//                         id: '18',
//                         item: "3 Pin Socket",
//                         price: 60,
//                     },
//                     {
//                         id: '19',
//                         item: "2 Dimmer(Phase Cut)",
//                         price: 60,
//                     },
//                 ]
//             },
//             {
//                 optionType: '4 Modular',
//                 options: [
//                     {
//                         id: '21',
//                         item: "4 Switch",
//                         price: 45,
//                     },
//                 ]
//             },
//             {
//                 optionType: '6 Modular',
//                 options: [
//                     {
//                         id: '24',
//                         item: "8 Switch",
//                         price: 45,
//                     },
//                     {
//                         id: '25',
//                         item: "6 Switch + 1 Fan",
//                         price: 45,
//                     },
//                     {
//                         id: '26',
//                         item: "4 Switch + 2 Fan",
//                         price: 45,
//                     },
//                 ],
//             },
//             {
//                 optionType: '8 Modular',
//                 options: [
//                     {
//                         id: '27',
//                         item: "10 Switch",
//                         price: 45,
//                     },
//                     {
//                         id: '28',
//                         item: "6 Switch + 2 Fan",
//                         price: 45,
//                     },
//                 ],
//             },
//         ],
//         icons: [
//             {
//                 optionType: 'Decorative Lights',
//                 options: [
//                     {
//                         id: '29',
//                         item: "/icon/Icons80x80px/Decorative Lights/1.svg",
//                         price: 5,
//                     },
//                     {
//                         id: '31',
//                         item: "/icon/Icons80x80px/Decorative Lights/3.svg",
//                         price: 6,
//                     }
//                 ]
//             },
//         ],
//         color: [
//             {
//                 optionType: 'Material Color',
//                 options: [
//                     {
//                         id: '36',
//                         item: "Black",
//                         price: 15,
//                         color:'#242121',
//                     },
//                 ]
//             },
//             {
//                 optionType: 'Frame Color',
//                 options: [
//                     {
//                         id: '44',
//                         item: "Royal Blue",
//                         price: 20,
//                         color: '#242121',
//                     }
//                 ]
//             },
//         ],
//     },
//     quantity: 2,
//     totalPrice: 892,
// };
