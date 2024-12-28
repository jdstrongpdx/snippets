## Azure Storage
- store files, messages, tables, and other types of information
- used by IaaS and PaaS Services
- a Azure Storage account is needed
- access data via HTTP or HTTPS

## Azure Blob Storage
- Object storage solution that is unstructured
- Can save/access thousands of uploads, videos, logs, in any file format.
- Does not require dedicated disk space
- Benefits
    - Store up to 8 TB of data for VMs
    - Storing data for analysis
    - Backup, restore, recovery, and archiving
    - Streaming video and audio
    - Distributed access
    - Serving files to a browser

## Azure Disk Storage
- Provides disks for Azure Virtual Machines
- You cant use Azure Disk Storage to store a disk outside of a VM
- Options
    - Standard SSD/HDD for less critical workloads
    - Premium SSD disks for mission-critical applications
    - Ultra disks for data-intensive workloads

## Azure File Storage
- Fully manage file shares with VMs or roles being able to mount and access file storage.
- Uses
    - Sharing files
    - Data processing and analysis - i.e. diagnostic data
    - Access from multiple VMs - application data sharing

## Azure Blob Access Tiers
- Balance storage costs with access needs
- Tiers
    - Hot access - frequently accessed
    - Cool access - infrequently accessed (every 30 days)
    - Archive access - rarely accessed (every 180 days)