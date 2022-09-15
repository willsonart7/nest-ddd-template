export interface EventConsumer {
  consume(job: object): Promise<void>;
}
