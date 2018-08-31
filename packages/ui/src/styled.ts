import rawStyled, { CreateStyled } from 'react-emotion'

import { Theme } from './theme.interface'

export const styled = rawStyled as CreateStyled<Theme>
