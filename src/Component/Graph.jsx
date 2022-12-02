import React from 'react'
import {Line} from 'react-chartjs-2';
import { useTheme } from '../Context/ThemeContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';


ChartJS.register(
    CategoryScale,LinearScale,PointElement,
    LineElement,Title,Tooltip,Legend
);

function Graph({graphData}) {
    const {theme}=useTheme();
  return (
    <div>
        <Line 
        data={
            {
                labels:graphData.map(i=>i[0]+1),
                datasets:[{
                    data:graphData.map(i=>i[1]),
                    label:'wpm',
                    borderColor:'gold'
                }]
            }
        }
        >

        </Line>
    </div>
  )
}

export default Graph