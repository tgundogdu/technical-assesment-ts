import * as React from 'react';
import './style.css';
import Grid from './grid';
import dataList from './data.json';

function getDayDiffBetweenTwoDates(
  mailReceivedDate: Date,
  solutionSentDate: Date
): number {
  const milisecondPerDay: number = 1000 * 60 * 60 * 24;
  const diffTime: number = Math.floor(
    solutionSentDate.getTime() - mailReceivedDate.getTime()
  );
  return Math.ceil(diffTime / milisecondPerDay);
}

/**
 * Burada tarih validasyonlarında ve tarih farklarını daha rahat bulabilmek için moment.js gibi kütüphaneler kullanılabilir. Ancak sanırım görmek istediğiniz bunlar diye kendim yaptım.
 * 1. JSON datayı kullanmamı istemediğiniz için dom a erişerek tüm satırları dönüp istediğim değerleri aldım.
 * 2. Satırın şu anki rengini ve olması gereken rengi buldum fark>limit şeklinde
 * 3. sonrasında bu iki renk olması gerektiği gibi eşit değilse hatalı renktedir.
 * 4. sonrasında satır sonuçlarını ve toplam yanlış sayısını console a yazdırdım.
 */
function control(today: Date, limit: number): number {
  let incorrectRowCount: number = 0;
  const rows: HTMLCollectionOf<Element> =
    document.getElementsByClassName('calculaterow');

  for (const row of rows) {
    const mailReceivedDate: Date = new Date(
      row.getElementsByTagName('td')[1].innerText
    );
    let solutionSentDate: Date;
    const solutionSentDateStr: string =
      row.getElementsByTagName('td')[2].innerText;
    if (solutionSentDateStr.trim() !== '') {
      solutionSentDate = new Date(solutionSentDateStr);
    } else {
      solutionSentDate = today;
    }
    const dateDiff: number = getDayDiffBetweenTwoDates(
      mailReceivedDate,
      solutionSentDate
    );
    const isBackgroundColorRed: boolean =
      row.classList.contains('red-background');
    const shuldBackgroundColorRed: boolean = dateDiff > limit ? true : false;

    if (isBackgroundColorRed !== shuldBackgroundColorRed) {
      console.log(`Limit: ${limit}, Fark: ${dateDiff},  YANLIŞ`);
      incorrectRowCount++;
    } else {
      console.log(`Limit: ${limit}, Fark: ${dateDiff},  DOĞRU`);
    }
  }
  return incorrectRowCount;
}

const App: React.FC = () => {
  const sourceProp = dataList;
  const today: Date = new Date();
  const [limit, setLimit] = React.useState<string>('5');

  const calculateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const incorrectCount: number = control(today, parseInt(limit, 10));
    console.log(`Toplam hatalı işaretlenmiş satır sayısı: ${incorrectCount}`);
  };

  let year: number = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <form onSubmit={calculateHandler}>
        <input type="text" disabled defaultValue={`${year}-${month}-${day}`} />
        <input
          type="text"
          value={limit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLimit(e.target.value)
          }
        />
        <button type="submit">Calculate</button>
      </form>
      <Grid source={sourceProp} />
      <div className="info">
        Lütfen console açınız. React DOM yönetimine dışardan müdahale etmemek
        için sonucu sayfaya değil console'a yazdırıyorum.
      </div>
    </div>
  );
};

export default App;
