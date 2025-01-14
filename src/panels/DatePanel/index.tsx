import * as React from 'react';
import classNames from 'classnames';
import type { DateBodyPassProps, DateRender } from './DateBody';
import DateBody from './DateBody';
import DateHeader from './DateHeader';
import type { PanelSharedProps } from '../../interface';
import { WEEK_DAY_COUNT } from '../../utils/dateUtil';
import type { KeyboardConfig } from '../../utils/uiUtil';
import { createKeyDownHandler } from '../../utils/uiUtil';
import moment from 'moment';

const DATE_ROW_COUNT = 6;

export type DatePanelProps<DateType> = {
  active?: boolean;
  dateRender?: DateRender<DateType>;

  id?: string;
  fieldid?: string;

  // Used for week panel
  panelName?: string;
  keyboardConfig?: KeyboardConfig;
  headerSelect?: any;
} & PanelSharedProps<DateType> &
  DateBodyPassProps<DateType>;

function DatePanel<DateType>(props: DatePanelProps<DateType>) {
  const {
    prefixCls,
    panelName = 'date',
    keyboardConfig,
    active,
    operationRef,
    generateConfig,
    value,
    viewDate,
    id,
    fieldid,
    onViewDateChange,
    onPanelChange,
    onSelect,
    sourceMode,
    diffValue,
    headerSelect,
    showSelectMask,
  } = props;
  const panelPrefixCls = `${prefixCls}-${panelName}-panel`;

  // ======================= Keyboard =======================
  operationRef.current = {
    onKeyDown: (event) =>
      createKeyDownHandler(event, {
        onLeftRight: (diff) => {
          onSelect(generateConfig.addDate(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onUpDown: (diff) => {
          onSelect(generateConfig.addDate(value || viewDate, diff * WEEK_DAY_COUNT), 'key');
        },
        onPageUpDown: (diff) => {
          onSelect(generateConfig.addMonth(value || viewDate, diff), 'key');
        },
        ...keyboardConfig,
      }),
  };

  // ==================== View Operation ====================
  const onYearChange = (diff: number) => {
    const newDate = generateConfig.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate, 'year', diff);
  };
  const onMonthChange = (diff: number) => {
    const newDate = generateConfig.addMonth(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate, 'month', diff);
  };

  const [sourceModeCopy, setSourceModeCopy] = React.useState<any>(sourceMode);
  React.useEffect(() => {
    if (sourceMode && sourceMode === 'year') {
      setSourceModeCopy('decade1');
    }
  }, [sourceMode]);
  const onYearMonthChange = () => {
    let currentDate;
    if (diffValue && diffValue[0] >= 0) {
      currentDate = moment(viewDate).add(diffValue[0], 'year');
    } else {
      currentDate = moment(viewDate).subtract(-diffValue[0], 'year');
    }
    const newDate = generateConfig.addMonth(currentDate as DateType, diffValue[1]);
    onViewDateChange(newDate);
  };

  React.useEffect(() => {
    if (diffValue) {
      onYearMonthChange();
    }
  }, [diffValue]);

  return (
    <div
      id={id ? id + '_panel' : ''}
      // @ts-ignore
      fieldid={fieldid && `${fieldid}_panel`}
      className={classNames(panelPrefixCls, {
        [`${panelPrefixCls}-active`]: active,
      })}
    >
      <DateHeader
        {...props}
        prefixCls={prefixCls}
        value={value}
        viewDate={viewDate}
        // View Operation
        onPrevYear={() => {
          onYearChange(-1);
        }}
        onNextYear={() => {
          onYearChange(1);
        }}
        onPrevMonth={() => {
          onMonthChange(-1);
        }}
        onNextMonth={() => {
          onMonthChange(1);
        }}
        onMonthClick={() => {
          onPanelChange('month', viewDate);
        }}
        onYearClick={() => {
          onPanelChange('year', viewDate);
        }}
        onCurrent={() => {
          onViewDateChange(generateConfig.getNow());
        }}
        sourceModeCopy={sourceModeCopy}
      />
      <DateBody
        {...props}
        onSelect={(date) => onSelect(date, 'mouse')}
        prefixCls={prefixCls}
        value={value}
        viewDate={viewDate}
        rowCount={DATE_ROW_COUNT}
      />
      {headerSelect !== undefined && showSelectMask ? (
        <div
          style={{
            opacity: '0.5',
            width: '100%',
            height: '100%',
            background: '#fff',
            position: 'absolute',
            left: 0,
            zIndex: '100',
          }}
        />
      ) : null}
    </div>
  );
}

export default DatePanel;
