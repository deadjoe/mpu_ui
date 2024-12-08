'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  PlusCircle,
  Server,
  ChevronRight,
  Box,
  Database,
  ChevronDown,
  ChevronUp,
  Expand,
  Shrink,
  GripVertical,
} from 'lucide-react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  Node,
  Edge,
  NodeProps,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  OnConnect,
} from 'reactflow'
import dagre from 'dagre'
import 'reactflow/dist/style.css'
import type { DataCenter, Host, HostGroup, Container, NodeData } from '@/types/datacenter'
import DataCenterForm from '@/components/datacenters/DataCenterForm'
import HostForm from '@/components/datacenters/HostForm'
import HostGroupForm from '@/components/datacenters/HostGroupForm'
import ContainerForm from '@/components/datacenters/ContainerForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable'

// Add custom CSS for ReactFlow nodes
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

// Mock data
const mockDataCenters: DataCenter[] = [
  {
    id: 'dc1',
    name: 'Shanghai DC',
    location: 'Shanghai, China',
    coordinates: [121.4737, 31.2304],
    description: 'Primary data center in Shanghai',
    status: 'active',
  },
  {
    id: 'dc2',
    name: 'Beijing DC',
    location: 'Beijing, China',
    coordinates: [116.4074, 39.9042],
    description: 'Secondary data center in Beijing',
    status: 'active',
  },
]

const mockHosts: Host[] = [
  // Shanghai DC Hosts
  {
    id: 'h1',
    name: 'SH-DB-01',
    ip: '192.168.1.101',
    type: 'physical',
    description: 'Shanghai Trading DB Server 1',
    tags: ['production', 'database'],
    status: 'running',
    dataCenterId: 'dc1',
    hostGroupId: 'g1',
  },
  {
    id: 'h2',
    name: 'SH-DB-02',
    ip: '192.168.1.102',
    type: 'physical',
    description: 'Shanghai Trading DB Server 2',
    tags: ['production', 'database'],
    status: 'running',
    dataCenterId: 'dc1',
    hostGroupId: 'g1',
  },
  {
    id: 'h3',
    name: 'SH-DB-03',
    ip: '192.168.1.103',
    type: 'physical',
    description: 'Shanghai Trading DB Server 3',
    tags: ['production', 'database'],
    status: 'running',
    dataCenterId: 'dc1',
    hostGroupId: 'g1',
  },
  {
    id: 'h4',
    name: 'SH-MDM-01',
    ip: '192.168.1.104',
    type: 'physical',
    description: 'Shanghai MDM DB Server 1',
    tags: ['production', 'database'],
    status: 'running',
    dataCenterId: 'dc1',
    hostGroupId: 'g2',
  },
  {
    id: 'h5',
    name: 'SH-MDM-02',
    ip: '192.168.1.105',
    type: 'physical',
    description: 'Shanghai MDM DB Server 2',
    tags: ['production', 'database'],
    status: 'running',
    dataCenterId: 'dc1',
    hostGroupId: 'g2',
  },
  {
    id: 'h6',
    name: 'SH-MDM-03',
    ip: '192.168.1.106',
    type: 'physical',
    description: 'Shanghai MDM DB Server 3',
    tags: ['production', 'database'],
    status: 'running',
    dataCenterId: 'dc1',
    hostGroupId: 'g2',
  },
  // Beijing DC Hosts
  {
    id: 'h7',
    name: 'BJ-DR-TRADE-01',
    ip: '192.168.2.101',
    type: 'physical',
    description: 'Beijing DR Trading DB Server 1',
    tags: ['dr', 'database'],
    status: 'running',
    dataCenterId: 'dc2',
    hostGroupId: 'g3',
  },
  {
    id: 'h8',
    name: 'BJ-DR-TRADE-02',
    ip: '192.168.2.102',
    type: 'physical',
    description: 'Beijing DR Trading DB Server 2',
    tags: ['dr', 'database'],
    status: 'running',
    dataCenterId: 'dc2',
    hostGroupId: 'g3',
  },
  {
    id: 'h9',
    name: 'BJ-DR-TRADE-03',
    ip: '192.168.2.103',
    type: 'physical',
    description: 'Beijing DR Trading DB Server 3',
    tags: ['dr', 'database'],
    status: 'running',
    dataCenterId: 'dc2',
    hostGroupId: 'g3',
  },
  {
    id: 'h10',
    name: 'BJ-DR-MDM-01',
    ip: '192.168.2.104',
    type: 'physical',
    description: 'Beijing DR MDM DB Server 1',
    tags: ['dr', 'database'],
    status: 'running',
    dataCenterId: 'dc2',
    hostGroupId: 'g4',
  },
  {
    id: 'h11',
    name: 'BJ-DR-MDM-02',
    ip: '192.168.2.105',
    type: 'physical',
    description: 'Beijing DR MDM DB Server 2',
    tags: ['dr', 'database'],
    status: 'running',
    dataCenterId: 'dc2',
    hostGroupId: 'g4',
  },
  {
    id: 'h12',
    name: 'BJ-DR-MDM-03',
    ip: '192.168.2.106',
    type: 'physical',
    description: 'Beijing DR MDM DB Server 3',
    tags: ['dr', 'database'],
    status: 'running',
    dataCenterId: 'dc2',
    hostGroupId: 'g4',
  },
]

const mockHostGroups: HostGroup[] = [
  {
    id: 'g1',
    name: 'Online Trading DB Group',
    description: 'Shanghai Trading Database Servers',
    hosts: mockHosts.filter(h => h.hostGroupId === 'g1'),
    dataCenterId: 'dc1',
  },
  {
    id: 'g2',
    name: 'MDM DB Group',
    description: 'Shanghai MDM Database Servers',
    hosts: mockHosts.filter(h => h.hostGroupId === 'g2'),
    dataCenterId: 'dc1',
  },
  {
    id: 'g3',
    name: 'DR_Trading DB Group',
    description: 'Beijing DR Trading Database Servers',
    hosts: mockHosts.filter(h => h.hostGroupId === 'g3'),
    dataCenterId: 'dc2',
  },
  {
    id: 'g4',
    name: 'DR_MDM DB Group',
    description: 'Beijing DR MDM Database Servers',
    hosts: mockHosts.filter(h => h.hostGroupId === 'g4'),
    dataCenterId: 'dc2',
  },
]

const mockContainers: Container[] = [
  // SH-DB-01 containers (Trading DB Primary)
  {
    id: 'c1',
    name: 'mysql-master',
    image: 'mysql:8.0',
    status: 'running',
    hostId: 'h1',
    ports: ['3306:3306'],
    environment: {
      MYSQL_ROOT_PASSWORD: '******',
      MYSQL_DATABASE: 'trading_db',
    },
    description: 'Trading Database Master',
  },
  {
    id: 'c2',
    name: 'redis-cache',
    image: 'redis:7.0-alpine',
    status: 'running',
    hostId: 'h1',
    ports: ['6379:6379'],
    environment: {},
    description: 'Trading Cache Server',
  },
  {
    id: 'c3',
    name: 'kafka-1',
    image: 'confluentinc/cp-kafka:7.4.0',
    status: 'running',
    hostId: 'h1',
    ports: ['9092:9092'],
    environment: {
      KAFKA_BROKER_ID: '1',
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181',
    },
    description: 'Message Queue Broker 1',
  },

  // SH-DB-02 containers (Trading DB Slave)
  {
    id: 'c4',
    name: 'mysql-slave-1',
    image: 'mysql:8.0',
    status: 'running',
    hostId: 'h2',
    ports: ['3306:3306'],
    environment: {
      MYSQL_ROOT_PASSWORD: '******',
      MYSQL_DATABASE: 'trading_db',
    },
    description: 'Trading Database Slave 1',
  },
  {
    id: 'c5',
    name: 'redis-replica-1',
    image: 'redis:7.0-alpine',
    status: 'running',
    hostId: 'h2',
    ports: ['6379:6379'],
    environment: {},
    description: 'Trading Cache Replica 1',
  },

  // SH-DB-03 containers (Trading DB Slave)
  {
    id: 'c6',
    name: 'mysql-slave-2',
    image: 'mysql:8.0',
    status: 'running',
    hostId: 'h3',
    ports: ['3306:3306'],
    environment: {
      MYSQL_ROOT_PASSWORD: '******',
      MYSQL_DATABASE: 'trading_db',
    },
    description: 'Trading Database Slave 2',
  },
  {
    id: 'c7',
    name: 'redis-replica-2',
    image: 'redis:7.0-alpine',
    status: 'running',
    hostId: 'h3',
    ports: ['6379:6379'],
    environment: {},
    description: 'Trading Cache Replica 2',
  },
  {
    id: 'c22',
    name: 'elasticsearch-1',
    image: 'elasticsearch:8.11.1',
    status: 'running',
    hostId: 'h3',
    ports: ['9200:9200', '9300:9300'],
    environment: {
      ES_JAVA_OPTS: '-Xms2g -Xmx2g',
      'discovery.type': 'single-node',
      'xpack.security.enabled': 'false',
    },
    description: 'Elasticsearch Node 1',
  },
  {
    id: 'c23',
    name: 'kibana-1',
    image: 'kibana:8.11.1',
    status: 'running',
    hostId: 'h3',
    ports: ['5601:5601'],
    environment: {
      ELASTICSEARCH_HOSTS: 'http://elasticsearch-1:9200',
    },
    description: 'Kibana Dashboard',
  },

  // SH-MDM-01 containers (MDM Primary)
  {
    id: 'c8',
    name: 'postgres-master',
    image: 'postgres:15',
    status: 'running',
    hostId: 'h4',
    ports: ['5432:5432'],
    environment: {
      POSTGRES_PASSWORD: '******',
      POSTGRES_DB: 'mdm_db',
    },
    description: 'MDM Database Master',
  },
  {
    id: 'c9',
    name: 'mongodb-master',
    image: 'mongodb:6.0',
    status: 'running',
    hostId: 'h4',
    ports: ['27017:27017'],
    environment: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: '******',
    },
    description: 'Document Store Master',
  },

  // SH-MDM-02 containers (MDM Slave)
  {
    id: 'c10',
    name: 'postgres-slave',
    image: 'postgres:15',
    status: 'running',
    hostId: 'h5',
    ports: ['5432:5432'],
    environment: {
      POSTGRES_PASSWORD: '******',
      POSTGRES_DB: 'mdm_db',
    },
    description: 'MDM Database Slave',
  },
  {
    id: 'c11',
    name: 'mongodb-replica',
    image: 'mongodb:6.0',
    status: 'running',
    hostId: 'h5',
    ports: ['27017:27017'],
    environment: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: '******',
    },
    description: 'Document Store Replica',
  },

  // BJ-DR-DB-01 containers (DR Trading Primary)
  {
    id: 'c12',
    name: 'mysql-dr-master',
    image: 'mysql:8.0',
    status: 'running',
    hostId: 'h6',
    ports: ['3306:3306'],
    environment: {
      MYSQL_ROOT_PASSWORD: '******',
      MYSQL_DATABASE: 'trading_db',
    },
    description: 'DR Trading Database Master',
  },
  {
    id: 'c13',
    name: 'redis-dr-master',
    image: 'redis:7.0-alpine',
    status: 'running',
    hostId: 'h6',
    ports: ['6379:6379'],
    environment: {},
    description: 'DR Trading Cache Master',
  },
  {
    id: 'c14',
    name: 'pulsar-1',
    image: 'apachepulsar/pulsar:2.10.2',
    status: 'running',
    hostId: 'h6',
    ports: ['6650:6650', '8080:8080'],
    environment: {},
    description: 'DR Message Queue Broker',
  },
  {
    id: 'c24',
    name: 'elasticsearch-2',
    image: 'elasticsearch:8.11.1',
    status: 'running',
    hostId: 'h6',
    ports: ['9200:9200', '9300:9300'],
    environment: {
      ES_JAVA_OPTS: '-Xms2g -Xmx2g',
      'discovery.type': 'single-node',
      'xpack.security.enabled': 'false',
    },
    description: 'Elasticsearch Node 2',
  },
  {
    id: 'c25',
    name: 'kibana-2',
    image: 'kibana:8.11.1',
    status: 'running',
    hostId: 'h6',
    ports: ['5601:5601'],
    environment: {
      ELASTICSEARCH_HOSTS: 'http://elasticsearch-2:9200',
    },
    description: 'Kibana Dashboard',
  },

  // BJ-DR-DB-02 containers (DR Trading Slave)
  {
    id: 'c15',
    name: 'mysql-dr-slave',
    image: 'mysql:8.0',
    status: 'running',
    hostId: 'h7',
    ports: ['3306:3306'],
    environment: {
      MYSQL_ROOT_PASSWORD: '******',
      MYSQL_DATABASE: 'trading_db',
    },
    description: 'DR Trading Database Slave',
  },
  {
    id: 'c16',
    name: 'redis-dr-slave',
    image: 'redis:7.0-alpine',
    status: 'running',
    hostId: 'h7',
    ports: ['6379:6379'],
    environment: {},
    description: 'DR Trading Cache Slave',
  },

  // BJ-DR-MDM-01 containers (DR MDM Primary)
  {
    id: 'c17',
    name: 'mariadb-dr-master',
    image: 'mariadb:10.11',
    status: 'running',
    hostId: 'h8',
    ports: ['3306:3306'],
    environment: {
      MARIADB_ROOT_PASSWORD: '******',
      MARIADB_DATABASE: 'mdm_db',
    },
    description: 'DR MDM Database Master',
  },
  {
    id: 'c18',
    name: 'mongodb-dr-master',
    image: 'mongodb:6.0',
    status: 'running',
    hostId: 'h8',
    ports: ['27017:27017'],
    environment: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: '******',
    },
    description: 'DR Document Store Master',
  },
  {
    id: 'c19',
    name: 'zookeeper',
    image: 'zookeeper:3.8',
    status: 'running',
    hostId: 'h8',
    ports: ['2181:2181'],
    environment: {},
    description: 'Distributed Coordination Service',
  },
  {
    id: 'c26',
    name: 'elasticsearch-3',
    image: 'elasticsearch:8.11.1',
    status: 'running',
    hostId: 'h8',
    ports: ['9200:9200', '9300:9300'],
    environment: {
      ES_JAVA_OPTS: '-Xms2g -Xmx2g',
      'discovery.type': 'single-node',
      'xpack.security.enabled': 'false',
    },
    description: 'Elasticsearch Node 3',
  },
  {
    id: 'c27',
    name: 'kibana-3',
    image: 'kibana:8.11.1',
    status: 'running',
    hostId: 'h8',
    ports: ['5601:5601'],
    environment: {
      ELASTICSEARCH_HOSTS: 'http://elasticsearch-3:9200',
    },
    description: 'Kibana Dashboard',
  },

  // BJ-DR-MDM-02 containers (DR MDM Slave)
  {
    id: 'c20',
    name: 'mariadb-dr-slave',
    image: 'mariadb:10.11',
    status: 'running',
    hostId: 'h9',
    ports: ['3306:3306'],
    environment: {
      MARIADB_ROOT_PASSWORD: '******',
      MARIADB_DATABASE: 'mdm_db',
    },
    description: 'DR MDM Database Slave',
  },
  {
    id: 'c21',
    name: 'mongodb-dr-slave',
    image: 'mongodb:6.0',
    status: 'running',
    hostId: 'h9',
    ports: ['27017:27017'],
    environment: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: '******',
    },
    description: 'DR Document Store Slave',
  },
]

export default function DataCentersPage() {
  const [dataCenters, setDataCenters] = useState(mockDataCenters)
  const [hosts, setHosts] = useState(mockHosts)
  const [hostGroups, setHostGroups] = useState(mockHostGroups)
  const [containers, setContainers] = useState(mockContainers)
  const [selectedDataCenter, setSelectedDataCenter] = useState<DataCenter | null>(null)
  const [selectedHostGroup, setSelectedHostGroup] = useState<HostGroup | null>(null)
  const [selectedHost, setSelectedHost] = useState<Host | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [showDataCenterForm, setShowDataCenterForm] = useState(false)
  const [showHostForm, setShowHostForm] = useState(false)
  const [showHostGroupForm, setShowHostGroupForm] = useState(false)
  const [showContainerForm, setShowContainerForm] = useState(false)
  const { theme } = useTheme()

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const expandAll = () => {
    const allIds = [
      ...mockDataCenters.map(dc => dc.id),
      ...mockHostGroups.map(hg => hg.id),
      ...mockHosts.map(h => h.id),
    ]
    setExpandedItems(allIds)
  }

  const collapseAll = () => {
    setExpandedItems([])
  }

  // Get host groups for selected data center
  const selectedDataCenterGroups = hostGroups.filter(
    group => group.dataCenterId === selectedDataCenter?.id
  )

  // Get hosts for selected host group
  const selectedGroupHosts = selectedHostGroup
    ? hosts.filter(host => selectedHostGroup.hosts.some(h => h.id === host.id))
    : []

  // Get containers for selected host
  const selectedHostContainers = useMemo(
    () =>
      selectedHost ? containers.filter(container => container.hostId === selectedHost.id) : [],
    [selectedHost, containers]
  )

  // Custom Node components
  const CustomNode = ({ data }: NodeProps) => {
    return (
      <div
        className={cn(
          'px-3 py-2 rounded-lg shadow-lg border',
          'bg-card text-card-foreground dark:bg-card dark:text-card-foreground',
          'min-w-[180px]'
        )}
      >
        <div className="flex items-center gap-2">
          {data.icon}
          <span className="text-sm font-medium">{data.label}</span>
          <Badge
            variant={data.status === 'active' ? 'success' : 'secondary'}
            className="ml-auto text-xs"
          >
            {data.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{data.description}</p>
        <Handle type="target" position={Position.Top} className="w-1.5 h-1.5 !bg-primary" />
        <Handle type="source" position={Position.Bottom} className="w-1.5 h-1.5 !bg-primary" />
      </div>
    )
  }

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  )

  // Layout algorithm
  const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))

    const nodeWidth = 180
    const nodeHeight = 80

    // Configure the layout algorithm with optimized parameters
    dagreGraph.setGraph({
      rankdir: direction,
      ranker: 'network-simplex', // Changed from 'tight-tree' for better distribution
      align: 'DL', // Changed to 'DL' for better alignment
      nodesep: 120, // Increased from 80
      ranksep: 150, // Increased from 100
      edgesep: 80, // Increased from 50
      marginx: 50, // Added margin
      marginy: 50, // Added margin
    })

    // Add nodes to the graph
    nodes.forEach(node => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
    })

    // Add edges to the graph
    edges.forEach(edge => {
      dagreGraph.setEdge(edge.source, edge.target)
    })

    // Apply the layout
    dagre.layout(dagreGraph)

    // Get the positioned nodes
    const positionedNodes = nodes.map(node => {
      const nodeWithPosition = dagreGraph.node(node.id)
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      }
    })

    return { nodes: positionedNodes, edges }
  }

  // Generate nodes and edges based on selection
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    if (selectedHost) {
      // Show host and its containers
      const nodes = [
        {
          id: selectedHost.id,
          type: 'custom',
          data: {
            label: selectedHost.name,
            icon: <Server className="w-4 h-4" />,
            status: selectedHost.status,
            description: selectedHost.description,
          },
          position: { x: 0, y: 0 },
        },
        ...selectedHostContainers.map(container => ({
          id: container.id,
          type: 'custom',
          data: {
            label: `${container.name}\n(${container.image})`,
            icon: <Box className="w-4 h-4" />,
            status: container.status,
            description: container.description,
          },
          position: { x: 0, y: 0 },
        })),
      ]

      const edges = selectedHostContainers.map(container => ({
        id: `${selectedHost.id}-${container.id}`,
        source: selectedHost.id,
        target: container.id,
        type: 'smoothstep',
        animated: true,
      }))

      return getLayoutedElements(nodes, edges)
    }

    if (selectedHostGroup) {
      // Show host group and its hosts
      const nodes = [
        {
          id: selectedHostGroup.id,
          type: 'custom',
          data: {
            label: selectedHostGroup.name,
            icon: <Database className="w-4 h-4" />,
            status: 'active',
            description: selectedHostGroup.description,
          },
          position: { x: 0, y: 0 },
        },
        ...selectedGroupHosts.map(host => ({
          id: host.id,
          type: 'custom',
          data: {
            label: host.name,
            icon: <Server className="w-4 h-4" />,
            status: host.status,
            description: host.description,
          },
          position: { x: 0, y: 0 },
        })),
      ]

      const edges = selectedGroupHosts.map(host => ({
        id: `${selectedHostGroup.id}-${host.id}`,
        source: selectedHostGroup.id,
        target: host.id,
        type: 'smoothstep',
        animated: true,
      }))

      return getLayoutedElements(nodes, edges)
    }

    if (selectedDataCenter) {
      // Show data center and its host groups
      const dcHostGroups = hostGroups.filter(group => group.dataCenterId === selectedDataCenter.id)
      const nodes = [
        {
          id: selectedDataCenter.id,
          type: 'custom',
          data: {
            label: selectedDataCenter.name,
            icon: <Database className="w-4 h-4" />,
            status: selectedDataCenter.status,
            description: selectedDataCenter.description,
          },
          position: { x: 0, y: 0 },
        },
        ...dcHostGroups.map(group => ({
          id: group.id,
          type: 'custom',
          data: {
            label: group.name,
            icon: <Server className="w-4 h-4" />,
            status: 'active',
            description: group.description,
          },
          position: { x: 0, y: 0 },
        })),
      ]

      const edges = dcHostGroups.map(group => ({
        id: `${selectedDataCenter.id}-${group.id}`,
        source: selectedDataCenter.id,
        target: group.id,
        type: 'smoothstep',
        animated: true,
      }))

      return getLayoutedElements(nodes, edges)
    }

    return { nodes: [], edges: [] }
  }, [
    selectedDataCenter,
    selectedHostGroup,
    selectedHost,
    hostGroups,
    selectedHostContainers,
    selectedGroupHosts,
  ])

  // Set initial nodes and edges only when selection changes
  useEffect(() => {
    setNodes([...layoutedNodes])
    setEdges([...layoutedEdges])
  }, [selectedDataCenter, selectedHostGroup, selectedHost])

  const onConnect: OnConnect = params => console.log(params)

  return (
    <DashboardLayout>
      <style>{styles}</style>
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-5rem)]">
        {/* Left panel - Resources */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="bg-background">
          <Card className="w-full h-full border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-card-foreground">Resources</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={expandAll}
                  title="Expand All"
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <Expand className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={collapseAll}
                  title="Collapse All"
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <Shrink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-10rem)]">
                <div className="space-y-4">
                  {/* Data Centers */}
                  {dataCenters.map(dc => (
                    <div key={dc.id} className="space-y-2">
                      <Collapsible open={expandedItems.includes(dc.id)}>
                        <CollapsibleTrigger
                          onClick={e => {
                            e.stopPropagation()
                            toggleExpand(dc.id)
                            setSelectedDataCenter(dc)
                            setSelectedHostGroup(null)
                            setSelectedHost(null)
                          }}
                          className={cn(
                            'flex items-center gap-2 w-full hover:bg-accent hover:text-accent-foreground rounded-md p-2',
                            selectedDataCenter?.id === dc.id && 'bg-accent text-accent-foreground'
                          )}
                        >
                          {expandedItems.includes(dc.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <Database className="h-4 w-4" />
                          <span className="text-sm font-medium">{dc.name}</span>
                          <Badge
                            variant={dc.status === 'active' ? 'success' : 'secondary'}
                            className="ml-auto"
                          >
                            {dc.status}
                          </Badge>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-8 space-y-2">
                          {/* Host Groups */}
                          {hostGroups
                            .filter(hg => hg.dataCenterId === dc.id)
                            .map(hg => (
                              <div key={hg.id}>
                                <Collapsible open={expandedItems.includes(hg.id)}>
                                  <CollapsibleTrigger
                                    onClick={e => {
                                      e.stopPropagation()
                                      toggleExpand(hg.id)
                                      setSelectedDataCenter(dc)
                                      setSelectedHostGroup(hg)
                                      setSelectedHost(null)
                                    }}
                                    className={cn(
                                      'flex items-center gap-2 w-full hover:bg-accent hover:text-accent-foreground rounded-md p-2',
                                      selectedHostGroup?.id === hg.id &&
                                        'bg-accent text-accent-foreground'
                                    )}
                                  >
                                    {expandedItems.includes(hg.id) ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                    <Server className="h-4 w-4" />
                                    <span className="text-sm font-medium">{hg.name}</span>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="pl-8 space-y-2">
                                    {/* Hosts */}
                                    {hosts
                                      .filter(host => host.hostGroupId === hg.id)
                                      .map(host => (
                                        <div key={host.id}>
                                          <Collapsible open={expandedItems.includes(host.id)}>
                                            <CollapsibleTrigger
                                              onClick={e => {
                                                e.stopPropagation()
                                                toggleExpand(host.id)
                                                setSelectedDataCenter(dc)
                                                setSelectedHostGroup(hg)
                                                setSelectedHost(host)
                                              }}
                                              className={cn(
                                                'flex items-center gap-2 w-full hover:bg-accent hover:text-accent-foreground rounded-md p-2',
                                                selectedHost?.id === host.id &&
                                                  'bg-accent text-accent-foreground'
                                              )}
                                            >
                                              {expandedItems.includes(host.id) ? (
                                                <ChevronDown className="h-4 w-4" />
                                              ) : (
                                                <ChevronRight className="h-4 w-4" />
                                              )}
                                              <Server className="h-4 w-4" />
                                              <span className="text-sm font-medium">
                                                {host.name}
                                              </span>
                                              <Badge
                                                variant={
                                                  host.status === 'running'
                                                    ? 'success'
                                                    : host.status === 'stopped'
                                                      ? 'secondary'
                                                      : 'warning'
                                                }
                                                className="ml-auto"
                                              >
                                                {host.status}
                                              </Badge>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="pl-8 space-y-2">
                                              {/* Containers */}
                                              {containers
                                                .filter(container => container.hostId === host.id)
                                                .map(container => (
                                                  <div
                                                    key={container.id}
                                                    className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground rounded-md p-2"
                                                  >
                                                    <Box className="h-4 w-4" />
                                                    <span className="text-sm font-medium">
                                                      {container.name}
                                                    </span>
                                                    <Badge
                                                      variant={
                                                        container.status === 'running'
                                                          ? 'success'
                                                          : container.status === 'stopped'
                                                            ? 'secondary'
                                                            : 'warning'
                                                      }
                                                      className="ml-auto"
                                                    >
                                                      {container.status}
                                                    </Badge>
                                                  </div>
                                                ))}
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start gap-2"
                                                onClick={() => {
                                                  setSelectedHost(host)
                                                  setShowContainerForm(true)
                                                }}
                                              >
                                                <PlusCircle className="h-4 w-4" />
                                                Add Container
                                              </Button>
                                            </CollapsibleContent>
                                          </Collapsible>
                                        </div>
                                      ))}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start gap-2"
                                      onClick={() => {
                                        setSelectedHostGroup(hg)
                                        setShowHostForm(true)
                                      }}
                                    >
                                      <PlusCircle className="h-4 w-4" />
                                      Add Host
                                    </Button>
                                  </CollapsibleContent>
                                </Collapsible>
                              </div>
                            ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2"
                            onClick={() => {
                              setSelectedDataCenter(dc)
                              setShowHostGroupForm(true)
                            }}
                          >
                            <PlusCircle className="h-4 w-4" />
                            Add Host Group
                          </Button>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => setShowDataCenterForm(true)}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Data Center
                  </Button>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </ResizablePanel>

        {/* Resizable handle */}
        <ResizableHandle withHandle>
          <div className="flex h-full w-full items-center justify-center">
            <GripVertical className="h-4 w-4" />
          </div>
        </ResizableHandle>

        {/* Right panel - Topology View */}
        <ResizablePanel defaultSize={75} className="bg-background">
          <Card className="w-full h-full border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Topology View</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100vh-12rem)]">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
                connectionMode={ConnectionMode.Strict}
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  animated: true,
                  style: {
                    stroke: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))',
                    strokeWidth: 2,
                  },
                }}
                className="bg-background"
              >
                <Background className="bg-muted" color="#666" gap={16} />
                <Controls className="bg-card border-border" />
              </ReactFlow>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </DashboardLayout>
  )
}
