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

### Github OIDC + Role

- Github에서 제공하는 OIDC를 이용하여 인증을 수행한다.
- secret을 사용하는 것 보다 안전하다.
  - [링크](https://docs.github.com/ko/enterprise-cloud@latest/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

- 방법
  - AWS IAM 콘솔에서 Identity providers 추가
    - ProviderURL: <https://token.actions.githubusercontent.com>
    - Audience: sts.amazonaws.com
  - Assign role, create new role
    - Trusted entities: Web identity
    - Identity provider: token.actions.githubusercontent.com
    - Audience: sts.amazonaws.com
    - Github organization: {{ YOUR_ORGANIZATION OR USERNAME }}
    - Github repository: {{ YOUR_REPOSITORY }}(Optional)
    - Github branch: {{ YOUR_BRANCH }}(Optional)
  - 생성한 role 선택
    - Permissions 탭에서 권한 부여
      - ECR Full Access
      - Add permission - Create inline policy

        ```json
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "VisualEditor0",
              "Effect": "Allow",
              "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeImages",
                "ecr:GetAuthorizationToken",
                "ecr:DescribeRepositories",
                "ecr:UploadLayerPart",
                "ecr:ListImages",
                "ecr:InitiateLayerUpload",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetRepositoryPolicy",
                "ecr:PutImage"
              ],
              "Resource": "*"
            }
          ]
        }
        ```

- 출처
  - [Github Docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
  - [정민 님 블로그](https://velog.io/@jeongmin78/CICD-Github-Action-AWS-IAM-Role-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC-ECR%EC%97%90-%EC%98%AC%EB%A6%AC%EA%B8%B0-8n3fmmgn)
