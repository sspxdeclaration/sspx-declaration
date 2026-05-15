export interface Violation {
  title: string;
  document: string;
  author: string;
  explanation: string;
  citation: string;
  link: string;
}

export interface AuthenticTeaching {
  title: string;
  document: string;
  author: string;
  year: string;
  citation: string;
}

export interface DeclarationParagraph {
  id: number;
  text: string;
  authenticTeaching?: AuthenticTeaching;
  violations: Violation[];
}
