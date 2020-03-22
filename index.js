function calculate() {
  const monthlyInvest = Number(document.getElementById('monthlyInvest').value);
  const rateOfReturn = Number(document.getElementById('rateOfReturn').value);
  const balanceToday = Number(document.getElementById('balanceToday').value);
  const years = Number(document.getElementById('years').value);

  console.log(monthlyInvest, rateOfReturn, balanceToday, years);

  const dividendsData = calculateDividends(
    monthlyInvest,
    rateOfReturn,
    balanceToday,
    years
  );

  placeDataOnPage(dividendsData);
}

function calculateDividends(monthlyInvest, rateOfReturn, balanceToday, years) {
  let yearData = [
    {
      year: 0,
      balancePrevYear: 0,
      invested: 0,
      investedTotal: 0,
      dividends: 0,
      dividendsTotal: 0,
      balance: balanceToday
    }
  ];

  const invested = monthlyInvest * 12;

  for (year = 1; year <= years; year++) {
    let balancePrevYear = yearData[yearData.length - 1].balance;

    let dividends = (balancePrevYear + invested) * (rateOfReturn / 100);
    console.log(dividends);
    let balance = balancePrevYear + invested + dividends;
    let investedTotal = year * invested;
    let dividendsTotal = balance - investedTotal;

    yearData = [
      ...yearData,
      {
        year,
        balancePrevYear,
        invested,
        investedTotal,
        dividends,
        dividendsTotal,
        balance
      }
    ];
  }

  console.log(yearData);

  return yearData;
}

function placeDataOnPage(yearData) {
  const outputs = document.getElementsByClassName('outputs')[0];
  outputs.innerHTML = ''; // Clear previous

  let formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0
  });

  let table = document.createElement('table');
  table.setAttribute('cellspacing', '5');

  table.appendChild(createHeaderRow());

  yearData.forEach(data => {
    let tr = document.createElement('tr');

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        let td = document.createElement('td');
        // td.innerHTML = Math.round(value * 100) / 100;
        td.innerHTML = formatter.format(value);
        tr.appendChild(td);
      }
    }
    table.appendChild(tr);
  });

  outputs.style.display = 'block';
  outputs.appendChild(table);
}

function createHeaderRow() {
  const headerLabels = [
    'År',
    'Ingående saldo (SEK)',
    'Investerat (SEK)',
    'Totalt investerat (SEK)',
    'Avkastning (SEK)',
    'Total avkastning (SEK)',
    'Utgående saldo (SEK)'
  ];

  let tr = document.createElement('tr');

  headerLabels.forEach(label => {
    let th = document.createElement('th');
    th.innerHTML = label;
    tr.appendChild(th);
  });

  return tr;
}
