import { Controller, Get } from '@nestjs/common';
import {
	HealthCheckService,
	HealthCheck,
	MemoryHealthIndicator,
	DiskHealthIndicator,
	HealthCheckResult,
	HealthIndicatorResult,
} from '@nestjs/terminus';
import { ControllerResponse } from '../shared/infrastructure/filters/response.decorator';

@Controller('health')
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private memory: MemoryHealthIndicator,
		private readonly disk: DiskHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	@ControllerResponse('Memory check')
	check(): Promise<HealthCheckResult> {
		const result = this.health.check([
			(): Promise<HealthIndicatorResult> => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
			(): Promise<HealthIndicatorResult> => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
		]);

		return result;
	}
}
