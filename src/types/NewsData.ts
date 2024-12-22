type Tag = string;

interface PatchNote {
  Title: string;
  Tags: Tag[]; 
  DateUploaded: string; 
  NewsImage: string; 
  NewsBanner: string; 
  NewsContent: string; 
}

interface LauncherNews {
  PatchNotes: PatchNote[]; 
}