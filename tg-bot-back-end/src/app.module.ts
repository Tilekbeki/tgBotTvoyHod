import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProgressinfoModule } from './progressinfo/progressinfo.module';
import { GoalModule } from './goal/goal.module';
import { UsergoalModule } from './usergoal/usergoal.module';
import { QuizController } from './quiz/quiz.controller';
import { QuizService } from './quiz/quiz.service';
import { QuizModule } from './quiz/quiz.module';
import { ResultModule } from './result/result.module';
import { PrizeService } from './prize/prize.service';
import { PrizeModule } from './prize/prize.module';
import { HelpReqModule } from './help-req/help-req.module';
import { UserPrizesModule } from './user-prizes/user-prizes.module';
import { SaveFilesModule } from './save-files/save-files.module';




@Module({
  imports: [AdminModule, UserModule, CategoryModule, ProgressinfoModule, GoalModule, UsergoalModule, QuizModule, ResultModule, PrizeModule, HelpReqModule, UserPrizesModule, SaveFilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
