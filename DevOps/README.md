# DevOps

## DevOps란?

DevOps는 Dev(개발)와 Ops(운영)를 결합한 개발 방법론으로, 시스템 개발 주기를 단축하고 지속적인 배포를 통해 높은 소프트웨어 품질을 제공하는 것을 목표로 한다.

## DevOps의 필요성

- 시스템 개발 주기 단축
- 지속적인 배포를 통한 높은 소프트웨어 품질 제공
- 개발 및 배포 속도 증가
- 개발 및 배포 효율성 증가
- 새로운 배포 실패율 감소
- 개발 및 배포 비용 감소
- 시스템 안정성 향상
- 시스템 보안성 향상
- 시스템 가용성 향상
- 시스템 확장성 향상

## DevOps Practices

- [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration)
- [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery)
- [Continuous Deployment](https://en.wikipedia.org/wiki/Continuous_deployment)
- [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)
- [Configuration Management](https://en.wikipedia.org/wiki/Configuration_management)
- [Continuous Monitoring](https://en.wikipedia.org/wiki/Continuous_monitoring)
- [Continuous Testing](https://en.wikipedia.org/wiki/Continuous_testing)
- [Continuous Feedback](https://en.wikipedia.org/wiki/Continuous_feedback)
- [Continuous Learning](https://en.wikipedia.org/wiki/Continuous_learning)
- [Continuous Experimentation](https://en.wikipedia.org/wiki/Continuous_experimentation)
- [Continuous Improvement](https://en.wikipedia.org/wiki/Continuous_improvement)

## DevOps Methodologies

- [Agile](https://en.wikipedia.org/wiki/Agile_software_development)
- [Scrum](https://en.wikipedia.org/wiki/Scrum_(software_development))
- [Kanban](https://en.wikipedia.org/wiki/Kanban_(development))
- [Lean](https://en.wikipedia.org/wiki/Lean_software_development)
- [DevOps](https://en.wikipedia.org/wiki/DevOps)
- [SRE](https://en.wikipedia.org/wiki/Site_Reliability_Engineering)
- [DevSecOps](https://en.wikipedia.org/wiki/DevSecOps)
- [DevOps Culture](https://en.wikipedia.org/wiki/DevOps_culture)

## DevOps Frameworks

- [Spinnaker](https://www.spinnaker.io/)
- [Jenkins](https://www.jenkins.io/)
- [Ansible](https://www.ansible.com/)
- [Puppet](https://puppet.com/)
- [Chef](https://www.chef.io/)
- [SaltStack](https://www.saltstack.com/)
- [Terraform](https://www.terraform.io/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
- [ELK](https://www.elastic.co/what-is/elk-stack)
- [ELK Stack](https://www.elastic.co/what-is/elk-stack)

## Keywords

- VPC: Virtual Private Cloud

- LDAP(엘답): Lightweight Directory Access Protocol

- 베스천 호스트(Bastion Host)
  - 내부와 외부 네트워크 사이에서 게이트 역할을 수행하는 호스트
  - 주로 방화벽의 메인 서버를 의미
  - 베스천은 원래 중세 성곽의 외부 방벽에 대한 강화된 돌출부로 가장 중요한 수비부분을 의미하는 말

- AWS
  - VPC: 일종의 공유기
  - Subnet: VPC 내부에서 망 구성을 효율적으로 하기위한 하위망
  - IGW(인터넷 게이트웨이): VPC와 Public Internet간 통신을 위한 연결지점
  - NAT Gateway: Private IP -> Public IP로 변환

- IP주소
  - A, B, C class로 구분
  - 10.100.0.0/16의 "/16" 부분: CIDR(사이더), /32이면 단 하나의 특정한 IP만을 지칭함.

- 네트워크 ACL
  - 순차번호(규칙)
    - 번호가 낮은 순서부터 우선 적용
    - 101, 102, 103보다는 100, 200, 300, 혹은 110, 120, 130 순으로 적용해야 추후에 더 쉽게 규칙을 추가 할 수 있음.

  - 휘발성 포트
    - 서버를 운영할 때, 특히 안바운드, 아웃바운드 포트를 디테일하게 설정하고 싶을 때 꼭 알아두어야 함.
    - *서비스 유형별로 아웃바운드 응답 포트를 꼭 고려해주어야 함!*
    - 이는 운영체제에 따라 상이함

      >- 다수의 Linux 커널(Amazon Linux 커널 포함)이 포트 32768-61000을 사용합니다.
      >- Elastic Load Balancing에서 시작된 요청은 포트 1024-65535를 사용합니다.
      >- Windows Server 2003까지의 Windows 운영 체제에서는 포트 1025-5000을 사용합니다.
      >- Windows Server 2008 이상 버전은 포트 49152-65535를 사용합니다.
      >- NAT 게이트웨이는 포트 1024 - 65535를 사용합니다.
      >- AWS Lambda 함수는 포트 1024-65535를 사용합니다.

    - 위와 같은 광범위한 포트 개방시에는 꼭 마지막 규칙으로 적용해서 다른규칙을 덮어쓰지 않도록 해야 함.
