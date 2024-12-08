'use client'

import { useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Database, HardDrive, Server, CircleDot, Cpu, Network, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const styles = `
.react-flow__node {
  border-radius: 12px;
  overflow: hidden;
}
.react-flow__node-custom {
  border-radius: 12px;
  overflow: hidden;
}
`

interface ClusterNode {
  id: string
  label: string
  type: 'primary' | 'secondary' | 'arbiter' | 'shard' | 'config' | 'router'
  status: 'running' | 'stopped' | 'error'
}

interface ClusterTopologyProps {
  instanceType: string
}

const getNodeIcon = (type: string) => {
  switch (type) {
    case 'primary':
      return <Database className="w-6 h-6 mb-2 text-primary" />
    case 'secondary':
      return <HardDrive className="w-6 h-6 mb-2 text-muted-foreground" />
    case 'arbiter':
      return <Shield className="w-6 h-6 mb-2 text-muted-foreground" />
    case 'router':
      return <Network className="w-6 h-6 mb-2 text-muted-foreground" />
    case 'config':
      return <Cpu className="w-6 h-6 mb-2 text-muted-foreground" />
    default:
      return <Server className="w-6 h-6 mb-2 text-muted-foreground" />
  }
}

const CustomNode = ({ data }: { data: any }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500'
      case 'stopped':
        return 'bg-red-500'
      case 'error':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getRoleVariant = (type: string) => {
    switch (type) {
      case 'primary':
        return 'default'
      case 'secondary':
        return 'secondary'
      case 'arbiter':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="flex flex-col items-center px-4 py-3 shadow-lg rounded-xl border bg-card min-w-[180px] backdrop-blur-sm backdrop-filter">
      {getNodeIcon(data.type)}
      <div className="text-center">
        <div className="font-semibold mb-1">{data.label}</div>
        <Badge variant={getRoleVariant(data.type)} className="mb-2">
          {data.type}
        </Badge>
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(data.status)}`} />
          <span className="text-xs text-muted-foreground">{data.status}</span>
        </div>
      </div>
    </div>
  )
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

export default function ClusterTopology({ instanceType }: ClusterTopologyProps) {
  const getInitialNodes = useCallback((): Node[] => {
    switch (instanceType.toLowerCase()) {
      case 'mongodb':
        return [
          {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 100 },
            data: { label: 'Primary', type: 'primary', status: 'running' },
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 250 },
            data: { label: 'Secondary 1', type: 'secondary', status: 'stopped' },
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 250 },
            data: { label: 'Secondary 2', type: 'secondary', status: 'stopped' },
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 250, y: 400 },
            data: { label: 'Arbiter', type: 'arbiter', status: 'stopped' },
          },
        ]
      case 'mysql':
      case 'mariadb':
        return [
          {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 100 },
            data: { label: 'Master', type: 'primary', status: 'stopped' },
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 250 },
            data: { label: 'Slave 1', type: 'secondary', status: 'stopped' },
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 250 },
            data: { label: 'Slave 2', type: 'secondary', status: 'stopped' },
          },
        ]
      case 'postgresql':
        return [
          {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 100 },
            data: { label: 'Primary', type: 'primary', status: 'stopped' },
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 250 },
            data: { label: 'Standby 1', type: 'secondary', status: 'stopped' },
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 250 },
            data: { label: 'Standby 2', type: 'secondary', status: 'stopped' },
          },
        ]
      case 'elasticsearch':
        return [
          {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 50 },
            data: { label: 'Master Node', type: 'primary', status: 'stopped' },
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 200 },
            data: { label: 'Data Node 1', type: 'secondary', status: 'stopped' },
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 200 },
            data: { label: 'Data Node 2', type: 'secondary', status: 'stopped' },
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 100, y: 350 },
            data: { label: 'Client Node 1', type: 'router', status: 'stopped' },
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 400, y: 350 },
            data: { label: 'Client Node 2', type: 'router', status: 'stopped' },
          },
        ]
      case 'kafka':
        return [
          {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 50 },
            data: { label: 'Broker 1', type: 'primary', status: 'stopped' },
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 200 },
            data: { label: 'Broker 2', type: 'primary', status: 'stopped' },
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 200 },
            data: { label: 'Broker 3', type: 'primary', status: 'stopped' },
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 250, y: 350 },
            data: { label: 'Zookeeper', type: 'config', status: 'stopped' },
          },
        ]
      case 'pulsar':
        return [
          {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 50 },
            data: { label: 'Broker 1', type: 'primary', status: 'stopped' },
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 200 },
            data: { label: 'Broker 2', type: 'primary', status: 'stopped' },
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 200 },
            data: { label: 'Broker 3', type: 'primary', status: 'stopped' },
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 100, y: 350 },
            data: { label: 'BookKeeper 1', type: 'secondary', status: 'stopped' },
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 400, y: 350 },
            data: { label: 'BookKeeper 2', type: 'secondary', status: 'stopped' },
          },
          {
            id: '6',
            type: 'custom',
            position: { x: 250, y: 450 },
            data: { label: 'Zookeeper', type: 'config', status: 'stopped' },
          },
        ]
      case 'zookeeper':
        return [
          {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 100 },
            data: { label: 'Leader', type: 'primary', status: 'stopped' },
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 250 },
            data: { label: 'Follower 1', type: 'secondary', status: 'stopped' },
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 250 },
            data: { label: 'Follower 2', type: 'secondary', status: 'stopped' },
          },
        ]
      default:
        return []
    }
  }, [instanceType])

  const getInitialEdges = useCallback((): Edge[] => {
    switch (instanceType.toLowerCase()) {
      case 'mongodb':
        return [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e1-3', source: '1', target: '3', animated: true },
          { id: 'e1-4', source: '1', target: '4', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
        ]
      case 'mysql':
      case 'mariadb':
      case 'postgresql':
        return [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e1-3', source: '1', target: '3', animated: true },
        ]
      case 'elasticsearch':
        return [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e1-3', source: '1', target: '3', animated: true },
          { id: 'e1-4', source: '1', target: '4', animated: true },
          { id: 'e1-5', source: '1', target: '5', animated: true },
          { id: 'e2-4', source: '2', target: '4', animated: true },
          { id: 'e3-5', source: '3', target: '5', animated: true },
        ]
      case 'kafka':
        return [
          { id: 'e1-4', source: '1', target: '4', animated: true },
          { id: 'e2-4', source: '2', target: '4', animated: true },
          { id: 'e3-4', source: '3', target: '4', animated: true },
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
          { id: 'e3-1', source: '3', target: '1', animated: true },
        ]
      case 'pulsar':
        return [
          { id: 'e1-4', source: '1', target: '4', animated: true },
          { id: 'e1-5', source: '1', target: '5', animated: true },
          { id: 'e2-4', source: '2', target: '4', animated: true },
          { id: 'e2-5', source: '2', target: '5', animated: true },
          { id: 'e3-4', source: '3', target: '4', animated: true },
          { id: 'e3-5', source: '3', target: '5', animated: true },
          { id: 'e4-6', source: '4', target: '6', animated: true },
          { id: 'e5-6', source: '5', target: '6', animated: true },
        ]
      case 'zookeeper':
        return [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e1-3', source: '1', target: '3', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
        ]
      default:
        return []
    }
  }, [instanceType])

  const defaultEdgeOptions = {
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: 'hsl(var(--primary))',
    },
    animated: true,
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes())
  const [edges, setEdges, onEdgesChange] = useEdgesState(getInitialEdges())

  return (
    <div className="h-[400px] w-full bg-muted/50 rounded-lg border">
      <style>{styles}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        className="react-flow-node-custom"
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
