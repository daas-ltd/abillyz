# Abillyz

**このアプリケーションが現在開発中です。**  
**https://abillyz.com/ として公開されているアプリケーションの機能をOSSで提供することを目的としています。**

Abillyz はMarkdownをサポートする強力なエディタで記事を投稿できるコンテンツ管理システムです。

## Requirements

Abillyz は次の主要な技術で構成されています。

- Ruby 3.3.0
- Rails 7.1.2
- MariaDB 10.11.x
- vips

各ランタイムやミドルウェアを用意することも、このリポジトリに含まれる`docker-compose.yaml`を用いてアプリケーションを起動することもできます。  

- Docker
- Docker Compose

## Installation

アプリケーションは Docker Compose を使用して起動できます。

```bash
git clone https://github.com/daas-ltd/abillyz.git
cd abillyz
docker compose up -d
```
