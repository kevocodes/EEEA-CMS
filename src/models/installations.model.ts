export interface Installation {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  public_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstallationDetail extends Installation {}
