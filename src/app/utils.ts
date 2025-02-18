export const adminCollection = "admins";
export const roleCollection = 'roles';
export const roleDoc = 'roleList';
export const extraCollection = 'extra';
export const staffCollection = 'staff';
export const branchCollection = 'branch';
export const branchConstCollection = 'branchConst';
export const batchCollection = 'batches';

export const statsCollection = "stats";
export const globalStatsDoc = "globalStatsDoc";
export const tagCollection = "tags";
export const serviceCollection = "services";
export const courseCollection = "course";
export const customerCollection = "customers";
export const customerServicesCollection = "customerServices";
export const paymentCollection = "payment";
export const servicePaymentCollection = "servicePayment";
export const statsMonthlyCollection = "statsMonthly";
export const statsDailyCollection = "statsDaily";
export const profileCollection = "profiles";
export const serviceCategoryCollection = "categories";
export const packageCollection = "packages";
export const roomCollection = "rooms";
export const visitCollection = "visits";
export const monthlyVisitCollection = "monthlyVisits";
export const sliderImages = "slider-images";
export const queries = "queires";
export const bannerText = "bannerText";
export const imagesCollection = "images";
export const videosCollection = "videos";
export const newsCollection = "news";
export const healthLogCollection = "healthLog";
export const customerDietsCollection = "customerDiets";
export const blogsCollection = "blogs";






export const barChartObject = {
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        callback: function (value) {
                            if (!(value % 4)) {
                                // return '$' + value + 'k'
                                return value;
                            }
                        }
                    }
                }
            ]
        },
        tooltips: {
            callbacks: {
                label: function (item, data) {
                    var label = data.datasets[item.datasetIndex].label || "";
                    var yLabel = item.yLabel;
                    var content = "";
                    if (data.datasets.length > 1) {
                        content += label;
                    }
                    content += yLabel;
                    return content;
                }
            }
        }
    },
    data: {
        labels: [],
        datasets: [
            {
                label: "",
                data: []
            },
        ]
    }
}

export const pieChartObject = {
    labels: [
    ],
    datasets: [{
        label: '',
        data: [],
        backgroundColor: [
        ],
        hoverOffset: 4
    }]
}

export const colorList = [
    "#89B5AF",
    "#C37B89",
    "#C6D57E",
    "#FCFFA6",
    "#79B4B7",
    "#716F81",
    "#F6AE99",
    "#B5CDA3",
    "#5F939A",
    "#FBC6A4",
    "#94D0CC",
    "#F1CA89",
    "#DE8971",
    "#B983FF",
    "#8E806A",
]