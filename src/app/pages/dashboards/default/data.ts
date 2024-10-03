import { ChartType } from './dashboard.model';
import { UserProfile } from './interfaces/user-profile.interface';
import { Wallets } from './interfaces/wallet.interface';

const defaultUser: UserProfile = {
    accountType: "subscription",
    birthDate: null,
    country: "",
    countryCode: "",
    email: "",
    firstName: "",
    isActive: true,
    lastName: "",
    middleName: "",
    mobile: "",
    profilePicture: "",
    referralCode: "",
};

const getNewDefaultWallet = (): Wallets => {
    return {
        mainWallet: 0.00,
        directWallet: 0.00,
        monthlyWallet: 0.00,
        consolidateWallet: 0.00,
        unilevelWallet: 0.00,
        fastWallet: 0.00,
        goldWallet: 0.00,
        diamondWallet: 0.00,
        platimumWallet: 0.00
    }
}

const pieChartData = {
    chart: {
        height: 320,
        type: 'donut',
    },
    series: [1, 0],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
    },
    dataLabels: {
        formatter: (val, opts) => `${(val * 2).toFixed(2)}%`,
    },
    labels: ['Remaining', 'Monthly', ],
    colors: ['#CCC', '#34c38f', ],
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }],
};

const totalLifetimeEarningsChart: ChartType = {
    series: [{
        name: 'Direct Referral',
        data: [59, 74, 35, 7, 95, 7, 30, 81, 24, 61, 7]
    }],
    chart: {
        type: 'area',
        height: 40,
        sparkline: { enabled: true },
        events: {
            animationEnd: (c, o)  => {
                const apxElems = document.querySelectorAll('apx-chart.cloneable');
                apxElems.forEach(apxElem => {
                    const clonedElem = apxElem.cloneNode(true);
                    apxElem.parentNode.replaceChild(clonedElem, apxElem);
                });
            }
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    colors: ['#73a580'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [25, 100, 100, 100]
        },
    },
    tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        marker: { show: false }
    }
}

const directBonusChart: ChartType = {
    series: [{
        name: 'Direct Referral',
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
    }],
    chart: {
        type: 'area',
        height: 40,
        sparkline: {
            enabled: true
        },
        events: {
            mouseMove: undefined,
            mouseLeave: undefined
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    colors: ['#f1b44c'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [25, 100, 100, 100]
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        marker: {
            show: false
        }
    }
};

const monthlyBonusChart: ChartType = {
    series: [{
        name: 'Monthly Bonus',
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    }],
    chart: {
        type: 'area',
        height: 40,
        sparkline: {
            enabled: true
        },
        selection: {
            enabled: false,
        },
        events: {
            animationEnd: (c, o)  => {
                const apxElems = document.querySelectorAll('apx-chart.cloneable');
                apxElems.forEach(apxElem => {
                    const clonedElem = apxElem.cloneNode(true);
                    apxElem.parentNode.replaceChild(clonedElem, apxElem);
                });
            }
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    colors: ['#3452e1'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [25, 100, 100, 100]
        },
    },
    tooltip: {
        enabled: false,
        x: {
            show: false,
        }
    }
};

const groupBonusChart: ChartType = {
    series: [{
        name: 'Group Bonus',
        data: [35, 53, 93, 47, 54, 24, 47, 75, 65, 19, 14],
        tooltip: {
            enabled: false
        }
    }],
    chart: {
        type: 'area',
        height: 40,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    colors: ['#50a5f1'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [25, 100, 100, 100]
        },
    },
    tooltip: {
        enabled: false,
        onDatasetHover: {
            highlightDataSeries: false,
        },
        marker: {
            show: false,
        },
        items: {
           display: "flex",
        },
        fixed: {
            enabled: false,
        },
    }
};

export { pieChartData, directBonusChart, monthlyBonusChart, groupBonusChart, defaultUser, getNewDefaultWallet, totalLifetimeEarningsChart };
