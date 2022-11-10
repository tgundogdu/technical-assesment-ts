import * as React from 'react';
import uuid from 'react-uuid';

interface IDataListItem {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: string;
}

interface IDataList {
  source: IDataListItem[];
}

const Grid: React.FC<IDataList> = ({ source }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Received Date</th>
          <th>Sent Date</th>
        </tr>
      </thead>
      <tbody>
        {source.map((item: IDataListItem) => {
          return (
            <tr
              className={`calculaterow ${
                item.isBackgroundColorRed ? 'red-background' : ''
              }`}
              key={uuid()}
            >
              <td>{item.name}</td>
              <td>{item.mailReceivedDate}</td>
              <td>{item.solutionSentDate || ''}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
