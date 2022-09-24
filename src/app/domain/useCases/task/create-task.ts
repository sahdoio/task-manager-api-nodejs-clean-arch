import { TaskEntity } from '../../entities/Task'
import { Result } from '../../protocols/result'

export interface CreateTaskDto {
  name: string
  description?: string
  statusId: number
}

export interface CreateTaskUc {
  exec: (user: CreateTaskDto) => Promise<Result<TaskEntity>>
}
