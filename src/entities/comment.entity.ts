import { Entity, PrimaryGeneratedColumn,OneToMany, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";
import { Like } from "./like.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
