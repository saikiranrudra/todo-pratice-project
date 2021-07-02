export default interface Task {
    type: string,
    title: string,
    subTitle: string,
    reminderDate: Date,
    description: string,
    isCompleted: boolean,
    _id: string
}

enum TaskType {
  important = 'important',
  notImporant = 'not-important',
  veryImportant = 'very-important'
}