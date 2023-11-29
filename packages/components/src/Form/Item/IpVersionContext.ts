import { createContext } from 'react';
import { IpFormatEnum } from '@dnt/utils/lib/ip'

export const IpVersionContext = createContext<IpFormatEnum>(IpFormatEnum.mix);