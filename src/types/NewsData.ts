type Tag = string;

export interface PatchNote {
  Title: string;
  Tags: Tag[]; 
  DateUploaded: string; 
  NewsImage: string; 
  NewsBanner: string; 
  NewsContent: string; 
}

export interface LauncherNews {
  PatchNotes: PatchNote[]; 
}