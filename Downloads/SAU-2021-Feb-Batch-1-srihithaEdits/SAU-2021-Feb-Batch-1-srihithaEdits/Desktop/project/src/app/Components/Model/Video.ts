import { Like } from './Like';
import { Comment } from './Comment';
import { Category } from './Category';
import { ReportedVideos } from './ReportedVideos';

export interface Video {
  videoId: Number;
  videoDesc: String;
  videoLink: String;
  isApproved: String;
  videoTitle: String;
  comment: Array<Comment>;
  like: Array<Like>;
  reportedVid: Array<ReportedVideos>;
  cat: Array<Category>;
}
