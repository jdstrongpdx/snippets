# Azure Networking
- a set of resources that links other Azure resources including:


## Azure Virtual Network
- Isolation and segmentation - define an IP Address pace and sub nets that allocate addresses, name resolution service, internal or external DNS server.
- Internet communications - define a public IP address for external access
- Communicate between Azure resources - enable virtual networks or service endpoints
- Communicate with on-premises resources - 
    - Point-to-site VPN - 
    - Site-to-site VPN - 
    - Azure ExpressRoute - dedicated private connectivity to Azure
- Route network traffic
- Filter network traffic - block by ip, port, and protocol
- Connect virtual networks

## Azure Virtual Network Settings
- Basic settings
    - Unique Network Name 
    - Address space - define internal address space in classes, intra-domain routing or CIDR format
    - Subscription - select the subscription for the Virtual Network
    - Services - basic or Standard DDoS protection
    - Network security groups
    - Routing tables
- Advanced settings - multiple subnets, DDoS protection, Service Endpoints

## Azure VPN Gateway
- VPN: a private, encrypted, interconnected network used to connect two or more trusted private networks to one another over an untrusted network
- VPN Gateway Connections
    - Site-to-site - connect on-premises data centers to virtual networks
    - Point-to-site - connect individual devices 
    - Network-to-network - connect one virtual network to another virtual network
- VPN Types
    - Policy-based - each packet is sent through a specific tunnel. Allows IKEv1 security, static routing.
    - Route-based - tunnels are determined based on dynamic tunneling.  Allows IKEv2 security, wildcard traffic selectors, dynamic routing protocols
- VPN Capabilities - four options with increasing tunnel connections, aggregate throughput, and border gateway protocol support. NOTE: basic cannot be upgraded later.
- VPN Deployment requirements
    - a virtual network with enough address space 
    - a gateway subnet with at least an /27 address mask
    - public IP address target 
    - local network gateway
    - virtual network gateway 
    - connection resource to connect the VPN gateway and local network gateway
    - Connect your data center you need: a VPN device, A public IPv4 address
- Fault tolerance 
    - VPN gateways are deployed as two instances in an active standby configuration or an active-active configuration

## Azure ExpressRoute
- Extend your on-premises network into Azure over a private non-internet connection