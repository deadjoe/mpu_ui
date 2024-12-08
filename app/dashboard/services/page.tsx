'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Plus, Package, Tag, Download, Trash2, Power, PowerOff } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

// Mock data for services
const initialServices = [
  {
    id: 1,
    name: 'MySQL',
    logo: '/mysql-logo.png',
    versions: ['8.0.1', '8.0.2', '8.0.3'],
    status: 'active',
    dockerImages: [
      { version: '8.0.1', status: 'downloaded' },
      { version: '8.0.2', status: 'available to download' },
      { version: '8.0.3', status: 'downloading' },
    ],
  },
  {
    id: 2,
    name: 'PostgreSQL',
    logo: '/postgresql-logo.png',
    versions: ['14.1', '14.2', '14.3'],
    status: 'active',
    dockerImages: [
      { version: '14.1', status: 'downloaded' },
      { version: '14.2', status: 'downloaded' },
      { version: '14.3', status: 'available to download' },
    ],
  },
  {
    id: 3,
    name: 'Redis',
    logo: '/redis-logo.png',
    versions: ['6.2.1', '6.2.2'],
    status: 'inactive',
    dockerImages: [
      { version: '6.2.1', status: 'downloaded' },
      { version: '6.2.2', status: 'available to download' },
    ],
  },
  {
    id: 4,
    name: 'MongoDB',
    logo: '/mongodb-logo.png',
    versions: ['6.0.1', '5.0.18', '4.4.21'],
    status: 'active',
    dockerImages: [
      { version: '6.0.1', status: 'downloaded' },
      { version: '5.0.18', status: 'downloaded' },
      { version: '4.4.21', status: 'available to download' },
    ],
  },
  {
    id: 5,
    name: 'Elasticsearch',
    logo: '/elasticsearch-logo.png',
    versions: ['8.11.1', '7.17.14', '6.8.23'],
    status: 'active',
    dockerImages: [
      { version: '8.11.1', status: 'downloaded' },
      { version: '7.17.14', status: 'downloading' },
      { version: '6.8.23', status: 'available to download' },
    ],
  },
  {
    id: 6,
    name: 'Kafka',
    logo: '/kafka-logo.png',
    versions: ['3.6.1', '3.5.1', '3.4.1'],
    status: 'active',
    dockerImages: [
      { version: '3.6.1', status: 'downloaded' },
      { version: '3.5.1', status: 'available to download' },
      { version: '3.4.1', status: 'available to download' },
    ],
  },
  {
    id: 7,
    name: 'Pulsar',
    logo: '/pulsar-logo.png',
    versions: ['3.1.1', '2.11.1', '2.10.3'],
    status: 'inactive',
    dockerImages: [
      { version: '3.1.1', status: 'downloaded' },
      { version: '2.11.1', status: 'available to download' },
      { version: '2.10.3', status: 'available to download' },
    ],
  },
  {
    id: 8,
    name: 'Zookeeper',
    logo: '/zookeeper-logo.png',
    versions: ['3.9.1', '3.8.3', '3.7.1'],
    status: 'active',
    dockerImages: [
      { version: '3.9.1', status: 'downloaded' },
      { version: '3.8.3', status: 'downloaded' },
      { version: '3.7.1', status: 'available to download' },
    ],
  },
]

export default function ServicesPage() {
  const [services] = useState(initialServices)
  const [selectedService, setSelectedService] = useState(null)

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)]">
        <div className="flex h-full">
          {/* Left sidebar - Service List */}
          <div className="w-64 bg-background shadow-lg overflow-y-auto">
            <div className="p-4">
              <Button variant="secondary" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
            <div className="border-t border-border">
              <ul className="divide-y divide-border">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className={`p-4 cursor-pointer hover:bg-muted ${
                      selectedService?.id === service.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 relative flex items-center justify-center rounded-full bg-secondary">
                        <span className="text-lg font-semibold text-secondary-foreground">
                          {service.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {service.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.versions.length} versions
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            service.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main content - Service Details */}
          {selectedService ? (
            <div className="flex-1 bg-muted p-6 overflow-y-auto">
              <div className="bg-background shadow rounded-lg">
                {/* Service Header */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 relative flex items-center justify-center rounded-lg bg-secondary">
                        <span className="text-2xl font-semibold text-secondary-foreground">
                          {selectedService.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {selectedService.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {selectedService.versions.length} versions available
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={selectedService.status === 'active' ? 'destructive' : 'default'}
                    >
                      {selectedService.status === 'active' ? (
                        <>
                          <PowerOff className="h-4 w-4 mr-2" />
                          Disable Service
                        </>
                      ) : (
                        <>
                          <Power className="h-4 w-4 mr-2" />
                          Enable Service
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Versions List */}
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Available Versions
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedService.dockerImages.map((image) => (
                      <div
                        key={image.version}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <Package className="h-6 w-6 text-secondary-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Version {image.version}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {image.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {image.status === 'available to download' ? (
                            <Button variant="default" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Select a service to view details</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
