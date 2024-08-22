---
slug: NeutronVPN
title: Neutron VPN
authors: [Castamere]
tags: [Neutron, VPN, Computer Networks]
---

Neutron 创建 VPN

<!--truncate-->

## Step 1 创建路由

```bash
neutron router-create ROUTERNAME
# neutron router-create ROUTERNAME | grep -w "id"
# neutron router-list
```

## Step 2 创建网络

```bash
neutron net-create NETNAME
# neutron net-create NETNAME | grep -w "id"
# 外网 neutron net-create NETNAME --router:external True --availability-zone-hint edge-4 | grep -w "id"
# 内网 neutron net-create NETNAME --availability-zone-hint edge-4 | grep -w "id"
# neutron net-list

# 删除
# neutron net-delete NETNAME
```

## Step 3 创建子网

```bash
neutron subnet-create NETNAME <CIDR> --name SUBNETNAME
# neutron subnet-create NETNAME <CIDR> --name SUBNETNAME | grep -w "id"
# neutron subnet-list

# 删除
# neutron subnet-delete SUBNETNAME
```

## Step 4 路由中添加接口

```bash
neutron router-interface-add ROUTERNAME SUBNETNAME
# neutron router-port-list ROUTERNAME

# 删除
# neutron router-interface-delete ROUTERNAME SUBNET|subnet=SUBNET|port=PORT
```

## Step 5 创建流动 ip

```bash
neutron floatingip-create ext-net1
# neutron floatingip-list
```

## Step 6 创建 VPN 政策 (IPSec)

```bash
neutron vpn-ipsecpolicy-create POLICYNAME --encryption-algorithm 3des --pfs group2
```

## Step 7 创建 VPN 政策 (Ike)

```bash
neutron vpn-ikepolicy-create POLICYNAME  --encryption-algorithm 3des  --pfs group2
```

## Step 8 创建 VPN 服务

```bash
neutron vpn-service-create --name VPNSERVICENAME --floatingip FLOATINGIPID ROUTERNAME (INNER)SUBNETNAME
```

## Step 9 创建 vpn 端点组

```bash
neutron vpn-endpoint-group-create --name GROUPNAME --type subnet --value ID
neutron vpn-endpoint-group-create --name GROUPNAME --type cidr  --value IP Segment
```

## Step 10 创建站点连接
