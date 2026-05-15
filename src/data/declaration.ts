import { enData } from './declaration-en';
import { frData } from './declaration-fr';
import { deData } from './declaration-de';
import { itData } from './declaration-it';
import type { DeclarationParagraph, Violation, AuthenticTeaching } from './types';

export type { DeclarationParagraph, Violation, AuthenticTeaching };

export const declarationData: Record<string, DeclarationParagraph[]> = {
  en: enData,
  fr: frData,
  de: deData,
  it: itData,
};
