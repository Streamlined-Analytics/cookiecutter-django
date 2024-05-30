function customStackedVerticalChartInit(url, selector, color_list = null, data_dict = null) {
    var $stackedVerticalChart = document.querySelector(selector || '.stacked-vertical-chart-example');
    var chart = window.echarts.init($stackedVerticalChart);
    chart.clear();
    fetch(url,
        {
            method: 'POST',
            headers: {
                'X-CSRFToken': data_dict['csrf_token']
            },
            body: JSON.stringify(data_dict),
        })
        .then(response => response.json())
        .then(info_dict => {
            color_list = color_list || [utils.getColor('primary'), utils.getColor('info'), localStorage.getItem('theme') === 'dark' ? '#229BD2' : '#73D3FE', localStorage.getItem('theme') === 'dark' ? '#195979' : '#A9E4FF'];
            // we specifically want the dict within the dict which has a key of main_reporting_graph
            var data_dict = info_dict['data']
            var legend_list = [];

            var series_list = [];
            for (var key in data_dict) {
                // add a new string to the legend_list
                legend_list.push(key);
                // create a new stack number for each key
                var stack_number = series_list.length;
                // add a new dict to the series_list with the keys name, type, stack, emphasis, and data
                series_list.push({
                    name: key,
                    type: 'bar',
                    // give each series a unique stack
                    stack: stack_number,
                    emphasis: {
                        itemStyle: {
                            shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3)
                        }
                    },
                    data: data_dict[key]
                });
            }
            if (info_dict['no_legend']) {
                var legend_info = {
                    show: false
                };
            } else {
                var legend_info = {
                    data: legend_list,
                    textStyle: {
                        color: utils.getGrays()['700']
                    }
                };
            }

            if ($stackedVerticalChart) {
                var userOptions = utils.getData($stackedVerticalChart, 'options');
                var chart = window.echarts.init($stackedVerticalChart);

                var getDefaultOptions = function getDefaultOptions() {
                    return {
                        color: color_list,
                        toolbox: {
                            feature: {
                                magicType: {
                                    type: ['stack']
                                },
                            },
                        },
                        tooltip: {
                            trigger: 'item',
                            padding: [7, 10],
                            backgroundColor: utils.getGrays()['100'],
                            borderColor: utils.getGrays()['300'],
                            textStyle: {
                                color: utils.getGrays()['900']
                            },
                            borderWidth: 1,
                            transitionDuration: 0,
                            axisPointer: {
                                type: 'none'
                            },
                        },
                        legend: legend_info,
                        xAxis: {
                            data: info_dict['x_axis_data'],
                            name: info_dict['x_axis_title'] || 'X Axis',
                            nameLocation: 'center',
                            nameGap: 30,
                            nameTextStyle: {
                                color: utils.getGrays()['600']
                            },
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            axisLabel: {
                                color: utils.getGrays()['600'],
                                margin: 8
                            },
                            axisLine: {
                                lineStyle: {
                                    color: utils.getGrays()['300'],
                                    type: 'dashed'
                                }
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        yAxis: {
                            name: info_dict['y_axis_title'] || 'Y Axis',
                            splitLine: {
                                lineStyle: {
                                    color: utils.getGrays()['300'],
                                    type: 'dashed'
                                }
                            },
                            axisLabel: {
                                color: utils.getGrays()['600']
                            },
                            position: 'right'
                        },
                        series: series_list,
                        barWidth: '15px',
                        grid: {
                            top: '8%',
                            bottom: '10%',
                            left: '10%',
                            right: '10%',
                            containLabel: true
                        }
                    };
                };
                echartSetOption(chart, userOptions, getDefaultOptions);
            }
        });
}

function customLineChartInit(url, selector, color_list = null, data_dict = null) {
    var $lineChart = document.querySelector(selector || '.line-chart-example');
    var chart = window.echarts.init($lineChart);
    chart.clear();
    fetch(url,
        {
            method: 'POST',
            headers: {
                'X-CSRFToken': data_dict['csrf_token']
            },
            body: JSON.stringify(data_dict),
        })
        .then(response => response.json())
        .then(info_dict => {
            color_list = color_list || [utils.getColor('primary'), utils.getColor('info'), localStorage.getItem('theme') === 'dark' ? '#229BD2' : '#73D3FE', localStorage.getItem('theme') === 'dark' ? '#195979' : '#A9E4FF'];
            var data_dict = info_dict['data']
            var legend_list = [];

            var series_list = [];
            for (var key in data_dict) {
                legend_list.push(key);
                series_list.push({
                    name: key,
                    type: 'line',
                    emphasis: {
                        itemStyle: {
                            shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3)
                        }
                    },
                    data: data_dict[key]
                });
            }
            if (info_dict['no_legend']) {
                var legend_info = {
                    show: false
                };
            } else {
                var legend_info = {
                    data: legend_list,
                    textStyle: {
                        color: utils.getGrays()['700']
                    }
                };
            }

            if ($lineChart) {
                var userOptions = utils.getData($lineChart, 'options');
                var chart = window.echarts.init($lineChart);

                var getDefaultOptions = function getDefaultOptions() {
                    return {
                        color: color_list,
                        tooltip: {
                            trigger: 'item',
                            padding: [7, 10],
                            backgroundColor: utils.getGrays()['100'],
                            borderColor: utils.getGrays()['300'],
                            textStyle: {
                                color: utils.getGrays()['900']
                            },
                            borderWidth: 1,
                            transitionDuration: 0,
                            axisPointer: {
                                type: 'none'
                            },
                        },
                        legend: legend_info,
                        xAxis: {
                            data: info_dict['x_axis_data'],
                            name: info_dict['x_axis_title'] || 'X Axis',
                            nameLocation: 'center',
                            nameGap: 30,
                            nameTextStyle: {
                                color: utils.getGrays()['600']
                            },
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            axisLabel: {
                                color: utils.getGrays()['600'],
                                margin: 8
                            },
                            axisLine: {
                                lineStyle: {
                                    color: utils.getGrays()['300'],
                                    type: 'dashed'
                                }
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        yAxis: {
                            name: info_dict['y_axis_title'] || 'Y Axis',
                            splitLine: {
                                lineStyle: {
                                    color: utils.getGrays()['300'],
                                    type: 'dashed'
                                }
                            },
                            axisLabel: {
                                color: utils.getGrays()['600']
                            },
                            position: 'right'
                        },
                        series: series_list,
                        grid: {
                            top: '8%',
                            bottom: '10%',
                            left: '10%',
                            right: '10%',
                            containLabel: true
                        }
                    };
                };
                echartSetOption(chart, userOptions, getDefaultOptions);
            }
        });
}


function mainPieChartInit(url, selector, color_list = null, data_dict = null) {
    var $pieChartEl = document.querySelector(selector || '.echart-pie-chart-example');
    var chart = window.echarts.init($pieChartEl);
    chart.clear();
    fetch(url,
        {
            method: 'POST',
            headers: {
                'X-CSRFToken': data_dict['csrf_token']
            },
            body: JSON.stringify(data_dict),
        })
        .then(response => response.json())
        .then(info_dict => {
            color_list = color_list || [utils.getColor('primary'), utils.getColor('info'), localStorage.getItem('theme') === 'dark' ? '#229BD2' : '#73D3FE', localStorage.getItem('theme') === 'dark' ? '#195979' : '#A9E4FF'];
            var data_dict = info_dict['data']
            var series_list = [];
            for (var key in data_dict) {
                series_list.push({
                    value: data_dict[key],
                    name: key,
                    itemStyle: {
                        color: color_list[series_list.length]
                    }
                });
            }

            if ($pieChartEl) {
                var userOptions = utils.getData($pieChartEl, 'options');
                var chart = window.echarts.init($pieChartEl);

                var getDefaultOptions = function getDefaultOptions() {
                    return {
                        legend: {
                            left: 'left',
                            textStyle: {
                                color: utils.getGrays()['600']
                            }
                        },
                        series: [{
                            type: 'pie',
                            radius: window.innerWidth < 530 ? '45%' : '60%',
                            label: {
                                color: utils.getGrays()['700']
                            },
                            center: ['50%', '55%'],
                            data: series_list,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: utils.rgbaColor(utils.getGrays()['600'], 0.5)
                                }
                            }
                        }],
                        tooltip: {
                            trigger: 'item',
                            padding: [7, 10],
                            backgroundColor: utils.getGrays()['100'],
                            borderColor: utils.getGrays()['300'],
                            textStyle: {
                                color: utils.getColors().dark
                            },
                            borderWidth: 1,
                            transitionDuration: 0,
                            axisPointer: {
                                type: 'none'
                            }
                        }
                    };
                };
                echartSetOption(chart, userOptions, getDefaultOptions);

                //- set chart radius on window resize
                utils.resize(function () {
                    if (window.innerWidth < 530) {
                        chart.setOption({
                            series: [{
                                radius: '45%'
                            }]
                        });
                    } else {
                        chart.setOption({
                            series: [{
                                radius: '60%'
                            }]
                        });
                    }
                });
            }
        });
}
