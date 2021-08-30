export const fMutualConnectionsName = 'get_mutual_connections'
export const fMutualConnectionsOut = {
  target_user_id: 'target_user_id',
  mutual_connections: 'mutual_connections',
} as const

export interface FMutualConnectionsType {
  [fMutualConnectionsOut.target_user_id]: number
  [fMutualConnectionsOut.mutual_connections]: number | null
}
