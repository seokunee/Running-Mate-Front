export interface INotice {
  title: string;
  content: string;
  address: AddressType;
  meetingTime: string;
  openChat: string;
  image: string;
}

export type AddressType = {
  dou: string;
  si: string;
  gu: string;
};

export type GetNoticesType = {
  address: AddressType;
  closed: boolean;
  content: string | null;
  count: number;
  id: number;
  image: string | null;
  meetingTime: string | null;
  openChat: string | null;
  regDate: string;
  title: string | null;
};
