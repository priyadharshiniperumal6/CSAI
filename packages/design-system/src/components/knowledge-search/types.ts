export type KnowledgeSearchSource = {
  importance: number;
  content: string;
  parentDocName: string;
};

export type KnowledgeSearchResult = {
  query: string;
  isLoading: boolean;
  isError?: boolean;
  response?: string;
  id?: string | number;
  key: string;
  sources?: KnowledgeSearchSource[];
  factualityScore?: number;
  context?: any;
  disableThumbsUpDown: boolean;
  actionClickedType: 'thumbsUp' | 'thumbsDown' | undefined;
  isCollapsed: boolean;
  borderColor: string;
  iconConfig: {
    icon: string;
    iconColor: string;
    iconBgColor: string;
    iconBorderColor: string;
    tooltip: string;
  };
};
