import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { nFormatter } from "../../utils/dataFormatter";

type provinceCovidCaseProps = {
  cases: [{ x: string; y: number; z: number }];
  lastUpdated: number;
  toDay: number;
  total: number;
};
type ProvinceProps = {
  covidDataProvince: provinceCovidCaseProps;
};

const Province = ({
  covidDataProvince = {
    cases: [{ x: "Loading...", y: 0, z: 0 }],
    lastUpdated: 0,
    toDay: 0,
    total: 0,
  },
}: ProvinceProps) => {
  const [numberOfProvince, setNumberOfProvince] = useState(10);
  return (
    <div className="w-full pt-5">
      <div className="mb-6 mt-0 md:pt-4 md:flex w-full md:space-x-4 space-y-4 md:space-y-0  items-center justify-center">
        <div className="bg-white items-center justify- pt-4 rounded-lg shadow-md w-full md:w-1/2 lg:w-4/12  ">
          <div className="text-md md:text-lg  font-bold">
            Tỉnh thành dẫn đầu về số ca
          </div>
          <FormattedRankedChart
            covidDataProvince={covidDataProvince.cases.map((c) => ({
              x: c.x,
              y: c.z,
            }))}
          />
        </div>
        <div className="bg-white items-center justify- pt-4 rounded-lg shadow-md w-full md:w-1/2 lg:w-4/12  ">
          <div className="text-md md:text-lg font-bold">
            {" "}
            Tỉnh thành nhiều ca nhất trong ngày
          </div>
          <div>
            <FormattedRankedChart
              covidDataProvince={covidDataProvince.cases.map((c) => ({
                x: c.x,
                y: c.y,
              }))}
            />
          </div>
        </div>{" "}
      </div>

      <div className="w-full md:max-w-xl p-2 mx-auto bg-white shadow-md rounded-2xl">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-red-700 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                <span>Tình hình COVID-19 tại các tỉnh thành</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-red-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <table className="table-fixed w-full">
                  <thead>
                    <tr className="text-gray-700">
                      <th className="text-left w-2/12">#</th>
                      <th className="text-left w-4/12">Tỉnh</th>
                      <th className="text-right w-3/12">Hôm nay</th>
                      <th className="text-right w-3/12"> Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {covidDataProvince.cases
                      .slice(0, numberOfProvince)
                      .map((pro, index) => {
                        return (
                          <tr
                            className="hover:bg-gray-100 rounded-md"
                            key={index}
                          >
                            <td className="text-left font-semibold text-gray-800 py-1 w-1/3">
                              {index + 1}
                            </td>
                            <td className="text-left font-semibold text-gray-800 py-1 w-1/3">
                              {pro.x}
                            </td>
                            <td className="text-right text-red-600">
                              {pro.y.toLocaleString() !== "0"
                                ? "+" + pro.y.toLocaleString()
                                : pro.y.toLocaleString()}
                            </td>
                            <td className="text-right">
                              {pro.z.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <button
                  onClick={() => {
                    if (numberOfProvince >= covidDataProvince.cases.length) {
                      setNumberOfProvince(4);
                    } else {
                      setNumberOfProvince(numberOfProvince + 8);
                    }
                  }}
                  className="p-2 m-4 w-6/12 text-gray-700 font-bold rounded border-2 bg-white hover:bg-gray-100"
                >
                  {numberOfProvince < covidDataProvince.cases.length
                    ? "Xem thêm"
                    : "Thu gọn"}
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Province;

const FormattedRankedChart = ({ covidDataProvince }) => {
  return (
    <div className="py-4">
      <ResponsiveContainer width="100%" aspect={1.6}>
        <BarChart
          width={500}
          height={300}
          data={covidDataProvince
            .sort((A: any, B: any) => {
              if (Number(A.y) < Number(B.y)) return 1;
              if (Number(A.y) > Number(B.y)) return -1;
              return 0;
            })
            .slice(0, 4)}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis dataKey="x" style={{ fontSize: "0.75em" }} />
          <YAxis
            style={{ fontWeight: "bold", fontSize: "0.75em" }}
            tickFormatter={(tick) => {
              return nFormatter(tick, 1);
            }}
            domain={[0, "auto"]}
            allowDataOverflow={true}
          />
          <Tooltip
            wrapperStyle={{
              backgroundColor: "#ccc",
              borderRadius: "40px",
              border: "none",
              fontSize: "0.75em",
            }}
            labelFormatter={(e) => "" + e}
            formatter={(value: number) =>
              new Intl.NumberFormat("en").format(value)
            }
          />

          <Bar dataKey="y" fill="#f78686" name="Ca nhiễm" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
