export class Lead {
  name: string
  email: string
  whatsapp?: string
  scenario?: string

  private constructor(
    readonly id: string | undefined,
    name: string,
    email: string,
    whatsapp?: string,
    scenario?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.name = name
    this.email = email
    this.whatsapp = whatsapp
    this.scenario = scenario
  }

  static create(input: CreateLead): Lead {
    return new Lead(undefined, input.name, input.email, input.whatsapp, input.scenario)
  }

  static restore(input: RestoreLead): Lead {
    return new Lead(input.id, input.name, input.email, input.whatsapp, input.scenario, input.createdAt, input.updatedAt)
  }

  update(input: Partial<Lead>): void {
    this.name = input.name ?? this.name
    this.email = input.email ?? this.email
    this.whatsapp = input.whatsapp ?? this.whatsapp
    this.scenario = input.scenario ?? this.scenario
  }
}

export interface CreateLead {
  name: string
  email: string
  whatsapp?: string
  scenario?: string
}

type RestoreLead = CreateLead & {
  id: string
  createdAt: Date
  updatedAt: Date
}
