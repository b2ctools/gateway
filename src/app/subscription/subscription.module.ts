
import { Module, forwardRef } from '@nestjs/common';
import { getSubscriptionRepo } from './infrastructure/subscription.repo-provider';
import { AddSubscriptionController } from './application/add-subscription/add-subscription.controller';
import { AddSubscriptionUseCase } from './application/add-subscription/add-subscription.usecase';
import { SubscriptionService } from './domain/subscription.service';
import { SearchSubscriptionController } from './application/search-subscription/search-subscription.controller';
import { SearchSubscriptionUseCase } from './application/search-subscription/search-subscription.usecase';
import { RemoveSubscriptionController } from './application/remove-subscription/remove-subscription.controller';
import { RemoveSubscriptionUseCase } from './application/remove-subscription/remove-subscription.usecase';
import { UpdateSubscriptionController } from './application/update-subscription/update-subscription.controller';
import { UpdateSubscriptionUseCse } from './application/update-subscription/update-subscription.usecase';
import { FindOneSubscriptionController } from './application/find-one-subscription/find-one-subscription.controller';
import { FindOneSubscriptionUseCase } from './application/find-one-subscription/find-one-subscription.usecase';
import { PlanModule } from '../plan/plan.module';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [forwardRef(() => TenantModule), forwardRef(() => PlanModule)],
  controllers: [AddSubscriptionController, SearchSubscriptionController, RemoveSubscriptionController, UpdateSubscriptionController, FindOneSubscriptionController],
  providers: [AddSubscriptionUseCase, SearchSubscriptionUseCase, RemoveSubscriptionUseCase, UpdateSubscriptionUseCse, SubscriptionService, getSubscriptionRepo(), FindOneSubscriptionUseCase],
  exports: [AddSubscriptionUseCase],
})
export class SubscriptionModule {}
