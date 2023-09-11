# Infra

## AWS

### Tips

- AZ(Availability Zone) 사용 시 a, c위주로 사용
- EC2 생성시, x86보다 ARM이 더 저렴하다.(20%)
- Storage 사용 시 gp2보다 gp3가 더 좋고 저렴하다.
- IAM instance profile을 사용하면 따로 키를 배포하지 않고도 S3등의 권한을 부여할 수 있다.

## AWS VPC Setting Example

### VPC

- VPC(Virtual Private Cloud): AWS에서 제공하는 가상 사설 네트워크
- 구조
  - VPC(10.100.0.0/16)
    - Subnet(Public1, 10.100.0.0/24): (AZ: ap-northeast-2a)
    - Subnet(Public2, 10.100.1.0/24): (AZ: ap-northeast-2c)
    - Subnet(Private1, 10.100.2.0/24): (AZ: ap-northeast-2a)
    - Subnet(Private2, 10.100.3.0/24): (AZ: ap-northeast-2c)
    - Internet Gateway
    - NAT Gateway(Public1): Connectivity Public, Allocate Elastic IP
    - NAT Gateway(Public2, if needed)
    - Route Table for Public
      - associate with Public1, Public2
      - route to Internet Gateway
    - Route Table for Private
      - associate with Private1, Private2
      - route to NAT Gateway

  - ACL(Access Control List)
    - Public
      - Inbound
        - 22, 80, 443
        - 1024-65535: ephemeral port
      - Outbound
        - allow all
    - Private
      - Inbound
        - allow all
      - Outbound
        - allow all

  - EC2 Instance
    - On Private1
      - Disable Auto-assign Public IP
      - Create Security Group
        - Inbound: SSH(22)
    - On Public1
      - Enable Auto-assign Public IP
      - Create Security Group
        - Inbound: SSH(22)
