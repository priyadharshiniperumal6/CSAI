import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Spin, Collapse, CollapseProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { isEqual, cloneDeep } from 'lodash-es';

import { UniAutoComplete } from '../auto-complete/UniAutoComplete';
import { UniInput } from '../input/UniInput';
import { UniButton } from '../button/UniButton';
import { UniModal } from '../modal/UniModal';
import { UniTooltip } from '../tooltip/UniTooltip';
import { UniFormElementMeta } from '../form-builder/types';
import { UniFormBuilder } from '../form-builder/UniFormBuilder';

import { KnowledgeSearchResult, KnowledgeSearchSource } from './types';
import { KnowledgeSourceList } from './components/KnowledgeSourceList';
import { KnowledgeSearchCard } from './components/KnowledgeSearchCard';
import {
  DEFAULT_ICON_CONFIG,
  FEEDBACK_FORM_STATE,
  THUMBS_DOWN_FEEDBACK_META,
  THUMBS_UP_FEEDBACK_META,
  REASON_KEY,
  SUB_REASON_KEY,
  ANSWER_KEY,
} from './consts';

import './KnowledgeSearchContainer.scss';

export type KnowledgeSearchActionButtons = {
  showThumbsUpDown: boolean;
  showSources?: boolean;
  disableThumbsUpDownAfterClick?: boolean;
};

export type KnowledgeSearchFeedbackProps = {
  isFeedbackSubmitLoading?: boolean;
  thumbsUpFeedbackMeta?: UniFormElementMeta[];
  thumbsDownFeedbackMeta?: UniFormElementMeta[];
  showFeedbackModal?: boolean;
  hideFeedbackModalOnlyFor?: 'thumbsUp' | 'thumbsDown';
  thumbsUpReasonPlaceholder?: string;
  thumbsUpAnswerPlaceholder?: string;
  thumbsUpReasonLabel?: string;
  thumbsUpAnswerLabel?: string;
  thumbsUpReasonOptions?: Array<{ label: string; value: string }>;
  thumbsDownReasonPlaceholder?: string;
  thumbsDownSubReasonPlaceholder?: string;
  thumbsDownAnswerPlaceholder?: string;
  thumbsDownReasonLabel?: string;
  thumbsDownSubReasonLabel?: string;
  thumbsDownAnswerLabel?: string;
  thumbsDownReasonOptions?: Array<{ label: string; value: string }>;
  thumbsDownSubReasonOptions?: Array<{ label: string; value: string }>;
  feedbackModalTitle?: string;
  feedbackModalOkText?: string;
  feedbackModalCancelText?: string;
  feedbackOptionalText?: string;
  feedbackStorageMessage?: string;
};

export type KnowledgeSearchSourceProps = {
  displayScore?: boolean;
  selectedSource?: KnowledgeSearchSource;
  validateFactualityScore?: boolean;
  negativeFactualityMessage?: string;
};

export type KnowledgeSearchContainerProps = {
  disableSearchInput?: boolean;
  displayScore?: boolean;
  selectedSource?: KnowledgeSearchSource;
  searchText?: string;
  askQuestionPlaceholder?: string;
  title?: string;
  feedbackFormState?: Record<string, any>;
  hideTitle?: boolean;
  enableAutoComplete?: boolean;
  autoCompleteOptions?: Array<{ title?: string; label: string; value: string | number }>;
  autoCompleteLoading?: boolean;
  feedbackProps?: KnowledgeSearchFeedbackProps;
  actionBtnProps: KnowledgeSearchActionButtons;
  sourceProps?: KnowledgeSearchSourceProps;
  expandSelectedSource?: boolean;
  isCardLayout?: boolean;
  enableActiveState?: boolean;
  searchResults?: KnowledgeSearchResult[];
  searchInputSuffix?: ReactNode;
  searchInputContainer?: ReactNode;
  actionFooter?: (result: KnowledgeSearchResult) => ReactNode;
  footerDetailsContainer?: (result: KnowledgeSearchResult) => ReactNode;
  onSearch?: (payload: { searchQuery: string; searchMethod: 'TYPE' | 'SELECT'; option?: any }) => void;
  onToggleSource?: (result: KnowledgeSearchResult) => void;
  onSubmitFeedback?: (payload: {
    type?: 'thumbsUp' | 'thumbsDown';
    formState?: Record<string, any>;
    questionId?: string | number;
  }) => void;
  onShowSourceDetailPanel?: (source: KnowledgeSearchSource) => void;
  onClickThumbsUpDown?: (result: KnowledgeSearchResult) => void;
  onChangeSearchText?: (value?: string) => void;
  onChangeExpandSelectedSource?: (value?: boolean) => void;
  onSelectedResult?: (result: KnowledgeSearchResult | undefined) => void;
  knowledgeActionButtons?: ReactNode;
};

const indicator = <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />;

const parseMarkdown = (markdownText?: string) => {
  if (!markdownText) return '';
  return markdownText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
};

const injectOptionalLabel = (
  meta: UniFormElementMeta[],
  key: string,
  placeholder?: string,
  label?: string,
  options?: Array<{ label: string; value: string }>,
  optionalText?: string
) => {
  meta.forEach(field => {
    if (field.key !== key) return;
    if (placeholder) {
      field.bindProps = { ...field.bindProps, placeholder };
    }
    if (label) {
      field.label = label;
    }
    if (options) {
      field.options = options;
    }
    const existingClass = field.labelBindProps?.class || 'after:text-neutral9';
    field.labelBindProps = {
      ...field.labelBindProps,
      class: `${existingClass} after:content-['(${optionalText ?? '(optional)'})']`.trim(),
    };
  });
};

export const KnowledgeSearchContainer = ({
  disableSearchInput,
  displayScore,
  selectedSource,
  searchText,
  askQuestionPlaceholder,
  title,
  feedbackFormState,
  hideTitle,
  enableAutoComplete,
  autoCompleteOptions,
  autoCompleteLoading,
  feedbackProps,
  actionBtnProps,
  sourceProps,
  expandSelectedSource,
  isCardLayout,
  enableActiveState,
  searchResults = [],
  searchInputSuffix,
  searchInputContainer,
  actionFooter,
  footerDetailsContainer,
  onSearch,
  onToggleSource,
  onSubmitFeedback,
  onShowSourceDetailPanel,
  onClickThumbsUpDown,
  onChangeSearchText,
  onChangeExpandSelectedSource,
  onSelectedResult,
  knowledgeActionButtons,
}: KnowledgeSearchContainerProps) => {
  const [searchQuery, setSearchQuery] = useState(searchText ?? '');
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [selectedResult, setSelectedResult] = useState<KnowledgeSearchResult | undefined>();
  const [showThumbsUpDownModal, setShowThumbsUpDownModal] = useState(false);
  const [feedbackFormMeta, setFeedbackFormMeta] = useState<UniFormElementMeta[]>([]);
  const [feedbackFormStateModel, setFeedbackFormStateModel] =
    useState<Record<string, any> | undefined>(feedbackFormState);
  const [feedbackOkDisabled, setFeedbackOkDisabled] = useState(false);
  const [questionId, setQuestionId] = useState<string | number>();
  const [actionClickedType, setActionClickedType] = useState<'thumbsUp' | 'thumbsDown' | undefined>();
  const [modalType, setModalType] = useState<'thumbsUp' | 'thumbsDown' | undefined>();
  const [showSourceId, setShowSourceId] = useState<string | number | undefined>();
  const [expandSource, setExpandSource] = useState(expandSelectedSource);

  useEffect(() => {
    setExpandSource(expandSelectedSource);
  }, [expandSelectedSource]);

  useEffect(() => {
    if (searchText !== undefined) {
      setSearchQuery(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    const keys = searchResults.filter(item => !item.isCollapsed).map(item => item.key);
    setActiveKey(keys);
    if (searchResults.length) {
      setSelectedResult(searchResults[searchResults.length - 1]);
      onSelectedResult?.(searchResults[searchResults.length - 1]);
    }
  }, [searchResults, onSelectedResult]);

  const askQuestion = askQuestionPlaceholder ?? 'Ask me a question!';
  const searchTitle = title || 'Knowledge Q&A';

  const handleSearch = (method: 'TYPE' | 'SELECT', value?: string, option?: any) => {
    const query = value ?? searchQuery;
    onSearch?.({
      searchQuery: query,
      searchMethod: method,
      option,
    });
    setSearchQuery('');
    onChangeSearchText?.('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch('TYPE', searchQuery);
    }
  };

  const handleThumbClick = (type: 'thumbsUp' | 'thumbsDown', result: KnowledgeSearchResult) => {
    setQuestionId(result.id ?? result.key);
    setActionClickedType(type);
    onClickThumbsUpDown?.(result);

    if (feedbackProps?.showFeedbackModal && feedbackProps.hideFeedbackModalOnlyFor !== type) {
      const initialState = feedbackFormState
        ? cloneDeep(feedbackFormState)
        : cloneDeep(FEEDBACK_FORM_STATE);
      setFeedbackFormStateModel(initialState);

      const meta =
        type === 'thumbsUp'
          ? cloneDeep(feedbackProps.thumbsUpFeedbackMeta ?? THUMBS_UP_FEEDBACK_META)
          : cloneDeep(feedbackProps.thumbsDownFeedbackMeta ?? THUMBS_DOWN_FEEDBACK_META);

      if (type === 'thumbsUp') {
        injectOptionalLabel(
          meta,
          REASON_KEY,
          feedbackProps?.thumbsUpReasonPlaceholder,
          feedbackProps?.thumbsUpReasonLabel,
          feedbackProps?.thumbsUpReasonOptions,
          feedbackProps?.feedbackOptionalText
        );
        injectOptionalLabel(
          meta,
          ANSWER_KEY,
          feedbackProps?.thumbsUpAnswerPlaceholder,
          feedbackProps?.thumbsUpAnswerLabel,
          undefined,
          feedbackProps?.feedbackOptionalText
        );
      } else {
        injectOptionalLabel(
          meta,
          REASON_KEY,
          feedbackProps?.thumbsDownReasonPlaceholder,
          feedbackProps?.thumbsDownReasonLabel,
          feedbackProps?.thumbsDownReasonOptions,
          feedbackProps?.feedbackOptionalText
        );
        injectOptionalLabel(
          meta,
          SUB_REASON_KEY,
          feedbackProps?.thumbsDownSubReasonPlaceholder,
          feedbackProps?.thumbsDownSubReasonLabel,
          feedbackProps?.thumbsDownSubReasonOptions,
          feedbackProps?.feedbackOptionalText
        );
        injectOptionalLabel(
          meta,
          ANSWER_KEY,
          feedbackProps?.thumbsDownAnswerPlaceholder,
          feedbackProps?.thumbsDownAnswerLabel,
          undefined,
          feedbackProps?.feedbackOptionalText
        );
      }

      setFeedbackFormMeta(meta);
      setShowThumbsUpDownModal(true);
      setModalType(type);
    } else {
      setFeedbackFormStateModel(undefined);
      setModalType(type);
      handleSubmitFeedback(undefined);
    }
  };

  const handleSubmitFeedback = (event?: { preventDefault: () => void }) => {
    event?.preventDefault();
    setShowThumbsUpDownModal(false);
    onSubmitFeedback?.({
      type: modalType,
      formState: feedbackFormStateModel,
      questionId,
    });
  };

  const searchResultsInDescending = useMemo(() => {
    return (searchResults || [])
      .map(result => ({
        ...result,
        borderColor: result.borderColor || 'transparent',
        iconConfig: result.iconConfig || DEFAULT_ICON_CONFIG,
      }))
      .slice()
      .reverse();
  }, [searchResults]);

  const collapseItems: CollapseProps['items'] = searchResultsInDescending.map(result => ({
    key: result.key,
    label: (
      <div className="flex items-center gap-2">
        <div
          className="flex h-10 items-center justify-center rounded-full border border-solid p-2"
          style={{
            backgroundColor: result.iconConfig.iconBgColor,
            borderColor: result.iconConfig.iconBorderColor,
          }}
        >
          <UniTooltip title={result.iconConfig.tooltip}>
            <span className="material-symbols-outlined text-primary" style={{ color: result.iconConfig.iconColor }}>
              {result.iconConfig.icon}
            </span>
          </UniTooltip>
        </div>
        <div className="text-neutral-700 text-base font-semibold">{result.query}</div>
      </div>
    ),
    children: (
      <div className="kna-collapse-content">
        <div className="ml-12 text-sm text-neutral-700">
          <div
            className={classNames('fetching-data text-gray-400', {
              hidden: !result.isLoading,
            })}
          >
            Fetching
          </div>
          {result.response && !result.isLoading ? (
            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: parseMarkdown(result.response) }} />
          ) : null}
        </div>
        <div className="ml-12 mt-3 flex items-center gap-2 border-t border-solid border-cool-grey pt-3">
          <UniButton
            type="text"
            shape="circle"
            size="small"
            disabled={result.disableThumbsUpDown}
            onClick={() => handleThumbClick('thumbsUp', result)}
          >
            <span
              className={classNames('material-symbols-outlined text-sm text-neutral8', {
                fill: result.actionClickedType === 'thumbsUp',
              })}
            >
              thumb_up
            </span>
          </UniButton>
          <UniButton
            type="text"
            shape="circle"
            size="small"
            disabled={result.disableThumbsUpDown}
            onClick={() => handleThumbClick('thumbsDown', result)}
          >
            <span
              className={classNames('material-symbols-outlined text-sm text-neutral8', {
                fill: result.actionClickedType === 'thumbsDown',
              })}
            >
              thumb_down
            </span>
          </UniButton>
          {actionBtnProps.showSources && result.sources?.length ? (
            <UniTooltip title="Sources">
              <UniButton type="text" size="small" onClick={() => toggleSource(result)}>
                <span className="material-symbols-outlined text-base text-neutral8">topic</span>
                <span
                  className={classNames('material-symbols-outlined text-base text-neutral8 transition-all', {
                    'rotate-180': expandSource && showSourceId === result.id,
                  })}
                >
                  keyboard_arrow_down
                </span>
              </UniButton>
            </UniTooltip>
          ) : null}
          {actionFooter?.(result)}
        </div>
        {expandSource && showSourceId === result.id ? (
          <div className="ml-12 mt-2 rounded-md border border-solid border-global-background p-4">
            {displayScore ? (
              <div className="mb-2 text-sm font-semibold text-neutral-700">Factuality Score: {result.factualityScore}</div>
            ) : null}
            <div className="text-sm font-semibold text-neutral-700">Sources:</div>
            <KnowledgeSourceList
              sources={result.sources}
              displayScore={sourceProps?.displayScore}
              selectedSource={sourceProps?.selectedSource}
              onShowSourceDetail={onShowSourceDetailPanel}
            />
          </div>
        ) : null}
        {footerDetailsContainer?.(result)}
      </div>
    ),
  }));

  const toggleSource = (item: KnowledgeSearchResult) => {
    if (!showSourceId || showSourceId === item.id) {
      setExpandSource(!expandSource);
      onChangeExpandSelectedSource?.(!expandSource);
    } else {
      setExpandSource(true);
    }
    setShowSourceId(item.id);
    onToggleSource?.(item);
  };

  return (
    <div className="knowledge-search-container rounded-md bg-white px-4 py-4">
      <div className="flex items-center gap-2">
        {!hideTitle ? <div className="text-base font-semibold text-neutral-700">{searchTitle}</div> : null}
        <div className="flex grow items-center gap-2">
          {enableAutoComplete ? (
            <UniAutoComplete
              value={searchQuery}
              onSelect={(value, option) => handleSearch('SELECT', value as string, option)}
              options={autoCompleteOptions}
              style={{ width: '100%' }}
              disabled={disableSearchInput}
              className="qna-autocomplete"
              defaultActiveFirstOption={false}
              suffixIcon={autoCompleteLoading ? indicator : undefined}
            >
              <UniInput
                value={searchQuery}
                onChange={event => {
                  setSearchQuery(event.target.value);
                  onChangeSearchText?.(event.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="h-11 rounded-full bg-neutral2"
                disabled={disableSearchInput}
                suffix={
                  <UniButton
                    onClick={() => handleSearch('TYPE')}
                    disabled={disableSearchInput}
                    type="text"
                    size="small"
                    shape="circle"
                    className="flex h-8 items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm text-primary">search</span>
                  </UniButton>
                }
              />
            </UniAutoComplete>
          ) : (
            <UniInput
              value={searchQuery}
              onChange={event => {
                setSearchQuery(event.target.value);
                onChangeSearchText?.(event.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="h-11 rounded-full bg-neutral2"
              disabled={disableSearchInput}
              suffix={
                <UniButton
                  type="text"
                  size="small"
                  shape="circle"
                  className="flex h-8 items-center justify-center"
                  onClick={() => handleSearch('TYPE')}
                >
                  <span className="material-symbols-outlined text-sm text-primary">search</span>
                </UniButton>
              }
            />
          )}
          {searchInputSuffix}
        </div>
        {knowledgeActionButtons}
      </div>
      {searchInputContainer}

      {!searchResults.length ? (
        <div className="mt-4">
          <div className="flex items-center gap-2 rounded-md bg-white p-4">
            <div className="flex items-center justify-center rounded-full border border-solid border-[#e7e7e7] bg-[#f8f0fe] p-2">
              <span className="material-symbols-outlined text-primary">flare</span>
            </div>
            <div className="text-sm text-gray-400">{askQuestion}</div>
          </div>
        </div>
      ) : isCardLayout ? (
        <div className="mt-4 flex flex-col gap-4 overflow-y-auto">
          {searchResultsInDescending.map(result => (
            <KnowledgeSearchCard
              key={result.key}
              result={result}
              enableActiveState={enableActiveState}
              actionFooter={actionFooter?.(result)}
              onThumbClick={handleThumbClick}
              showSources={actionBtnProps.showSources}
              onToggleSources={toggleSource}
              expandSource={expandSource}
              showSourceId={showSourceId}
              sourceContent={
                <KnowledgeSourceList
                  sources={result.sources}
                  displayScore={sourceProps?.displayScore}
                  selectedSource={sourceProps?.selectedSource}
                  onShowSourceDetail={onShowSourceDetailPanel}
                />
              }
              actionButtons={knowledgeActionButtons}
            />
          ))}
        </div>
      ) : (
        <Collapse
          className="kna-collapse mt-4 bg-transparent"
          bordered={false}
          items={collapseItems}
          expandIconPosition="end"
          activeKey={activeKey}
          onChange={keys => {
            setActiveKey(Array.isArray(keys) ? (keys as string[]) : [keys as string]);
          }}
        />
      )}

      <UniModal
        open={showThumbsUpDownModal}
        title={feedbackProps?.feedbackModalTitle ?? 'Feedback'}
        centered
        footerOkLabel={feedbackProps?.feedbackModalOkText ?? 'Submit'}
        footerCancelLabel={feedbackProps?.feedbackModalCancelText ?? 'Cancel'}
        showCancelBtn
        onCancel={() => setShowThumbsUpDownModal(false)}
        onOk={handleSubmitFeedback}
        isSubmitBtnLoading={feedbackProps?.isFeedbackSubmitLoading}
        isOkBtnDisabled={feedbackOkDisabled}
      >
        {feedbackFormMeta.length ? (
          <>
            <UniFormBuilder
              uniFormMeta={feedbackFormMeta}
              uniFormData={feedbackFormStateModel ?? {}}
              onIsUniFormValid={valid => setFeedbackOkDisabled(!valid)}
              onChange={values => setFeedbackFormStateModel(values)}
            />
            <i className="text-xs">
              {feedbackProps?.feedbackStorageMessage ||
                'We store your Feedback for future improvements to our models.'}
            </i>
          </>
        ) : (
          <div>No feedback configuration provided.</div>
        )}
      </UniModal>
    </div>
  );
};
