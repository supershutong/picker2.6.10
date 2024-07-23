import type { GenerateConfig } from './generate';

export type Locale = {
  locale: string;

  // ===================== Date Panel =====================
  /** Display month before year in date panel header */
  monthBeforeYear?: boolean;
  yearFormat: string;
  monthFormat?: string;
  quarterFormat?: string;
  halfYearFormat?: (date: any, hasYear?: boolean) => string;

  today: string;
  now: string;
  backToToday: string;
  ok: string;
  timeSelect: string;
  dateSelect: string;
  weekSelect?: string;
  clear: string;
  month: string;
  year: string;
  previousMonth: string;
  nextMonth: string;
  monthSelect: string;
  yearSelect: string;
  decadeSelect: string;

  dayFormat: string;
  dateFormat: string;
  dateTimeFormat: string;
  previousYear: string;
  nextYear: string;
  previousDecade: string;
  nextDecade: string;
  previousCentury: string;
  nextCentury: string;

  shortWeekDays?: string[];
  shortMonths?: string[];
  monthsShort?: string[];
};

export type PanelMode =
  | 'time'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'halfYear'
  | 'year'
  | 'decade';

export type PickerMode = Exclude<PanelMode, 'datetime' | 'decade'>;

export type PanelRefProps = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClose?: () => void;
  showSelectMask?: boolean;
};

export type NullableDateType<DateType> = DateType | null | undefined;

export type OnSelect<DateType> = (value: DateType, type: 'key' | 'mouse' | 'submit') => void;

export type PanelSharedProps<DateType> = {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  value?: NullableDateType<DateType>;
  viewDate: DateType;
  /** [Legacy] Set default display picker view date */
  defaultPickerValue?: DateType;
  defaultValue?: DateType;
  locale: Locale;
  disabledDate?: (date: DateType) => boolean;

  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  superPrevIcon?: React.ReactNode;
  superNextIcon?: React.ReactNode;

  /**
   * Typescript can not handle generic type so we can not use `forwardRef` here.
   * Thus, move ref into operationRef.
   * This is little hack which should refactor after typescript support.
   */
  operationRef: React.MutableRefObject<PanelRefProps>;

  onSelect: OnSelect<DateType>;
  onViewDateChange: (value: DateType) => void;
  onPanelChange: (
    mode: PanelMode | null,
    viewValue: DateType,
    type?: string,
    diff?: number,
  ) => void;
  sourceMode: any;
  diffValue?: any;
  showSelectMask?: boolean;
};

export type DisabledTimes = {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
};

export type DisabledTime<DateType> = (date: DateType | null) => DisabledTimes;

export type OnPanelChange<DateType> = (
  value: DateType,
  mode: PanelMode,
  type?: 'year' | 'month',
  diff?: number,
) => void;

export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

export type Components = {
  button?: React.ComponentType | string;
  rangeItem?: React.ComponentType | string;
};

export type RangeList = {
  label: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}[];

export type CustomFormat<DateType> = (value: DateType) => string;
