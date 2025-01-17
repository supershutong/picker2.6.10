import * as React from 'react';
import type { NullableDateType, RangeValue } from './interface';

export type RangeContextProps = {
  /**
   * Set displayed range value style.
   * Panel only has one value, this is only style effect.
   */
  rangedValue?: [NullableDateType<any>, NullableDateType<any>] | null;
  hoverRangedValue?: RangeValue<any>;
  inRange?: boolean;
  panelPosition?: 'left' | 'right' | false;
  fieldid?: string;
};

const RangeContext = React.createContext<RangeContextProps>({});

export default RangeContext;
