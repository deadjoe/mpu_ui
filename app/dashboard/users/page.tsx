'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table'
import { Edit, Trash2, UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data
const initialUsers = [
  { id: 1, username: 'admin', role: 'admin', team: 'System', status: 'active' },
  { id: 2, username: 'operator1', role: 'operator', team: 'DevOps', status: 'active' },
  { id: 3, username: 'user1', role: 'user', team: 'Development', status: 'active' },
  { id: 4, username: 'user2', role: 'user', team: 'QA', status: 'inactive' },
]

const columnHelper = createColumnHelper<any>()

const columns = [
  columnHelper.accessor('username', {
    header: 'Username',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: info => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
        ${
          info.getValue() === 'admin'
            ? 'bg-purple-500/20 text-purple-400'
            : info.getValue() === 'operator'
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-muted text-muted-foreground'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('team', {
    header: 'Team',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
        ${info.getValue() === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: info => (
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    ),
  }),
]

export default function UsersPage() {
  const [data] = useState(() => [...initialUsers])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Users</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <Button variant="secondary">
            <UserPlus className="h-4 w-4 mr-2 text-current" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Input
                type="text"
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search users..."
                className="max-w-sm"
              />
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Teams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
