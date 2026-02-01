'use client';

import { FolderOpen, FileText, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { WeeklyActivityChart } from '@/components/dashboard/weekly-activity-chart';
import { ProjectDistributionChart } from '@/components/dashboard/project-distribution-chart';
import { MonthlyTrendChart } from '@/components/dashboard/monthly-trend-chart';
import { RecentWorklogs } from '@/components/dashboard/recent-worklogs';

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>대시보드</h1>
        <p className='text-muted-foreground'>업무 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='총 프로젝트'
          value={12}
          description='활성 프로젝트 8개'
          icon={FolderOpen}
        />
        <StatCard
          title='이번 주 업무일지'
          value={24}
          description='전주 대비'
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title='총 작업 시간'
          value='156h'
          description='이번 달 누적'
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title='완료된 프로젝트'
          value={4}
          description='이번 분기'
          icon={CheckCircle}
        />
      </div>

      {/* 차트 영역 */}
      <div className='grid gap-4 lg:grid-cols-2'>
        <WeeklyActivityChart />
        <ProjectDistributionChart />
      </div>

      {/* 월별 추이 */}
      <MonthlyTrendChart />

      {/* 최근 업무일지 */}
      <RecentWorklogs />
    </div>
  );
}
