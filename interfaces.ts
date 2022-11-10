interface IDataListItem {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: string;
}

interface IDataList {
  source: IDataListItem[];
}

export { IDataListItem, IDataList };
