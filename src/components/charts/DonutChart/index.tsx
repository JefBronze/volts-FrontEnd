import React from "react";
import Chart from "react-apexcharts";

interface IProps {
    data: number[]
    gradientToColors?: string[]
    trackBackground?: string
    typeValue?: string
}
export const DonutChart = ({ data, trackBackground, gradientToColors, typeValue }: IProps) => {
  var options = {
    chart: {
      height: 100,
      type: "radialBar",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "65%",
          background: "#1E1E1E",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: trackBackground,
          strokeWidth: "100%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          show: true,
          name: {
            show: false
          },
          value: {
            formatter: function (val: any) {
              return parseInt(val) + (typeValue ?? "%");
            },
            color: "#FFF",
            fontSize: "36px",
            show: true
          }
        }
      }
    },
    fill: {
      style: "vertical",
      type: "gradient",
      gradient: {
        gradientToColors: [gradientToColors],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 0]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Percent"]
  } as any;

  return <Chart options={options} series={data} type="radialBar" width="300" />;
};