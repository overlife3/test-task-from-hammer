import img_1 from "../assets/img/table1.jpg";
import img_2 from "../assets/img/table2.jpg";
import img_3 from "../assets/img/table3.jpg";

export const PlannerConfig = [
  {
    imgId: 1,
    title: "Круглый стол, 5 стульев",
    width: 150,
    height: 138.75,
  },
  {
    imgId: 2,
    title: "Прямоугольный стол, 2 стула",
    width: 120,
    height: 87.36,
  },
  {
    imgId: 3,
    title: "Квадратный стол, 4 стула",
    width: 100,
    height: 99,
  },
];

export function getImgById(id) {
  switch (id) {
    case 1:
      return img_1;
    case 2:
      return img_2;
    case 3:
      return img_3;
    default:
      console.log("default");
  }
}
