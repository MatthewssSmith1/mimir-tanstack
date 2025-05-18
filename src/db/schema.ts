import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { createNodesTable } from '@models/nodes';
import { pgRole } from 'drizzle-orm/pg-core';

const authenticated = pgRole('authenticated').existing()

export const nodes = createNodesTable(authenticated) 

export type Node = InferSelectModel<typeof nodes>;
export type InsertNode = InferInsertModel<typeof nodes>
