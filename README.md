# README

Welcome to Drag`n Drop files!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

This app uses AWS S3 to store files. You will need to create an AWS account and an S3 bucket.

After you create a a bucket you need to set it to public add the following CORS configuration to the bucket:

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

and this policy to:


```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

Now create an IAM user with access to the bucket. Attach this policy to it:


```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "AllowAccessToBucket",
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject",
				"s3:DeleteObject",
				"s3:DeleteObjectVersion"
			],
			"Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
		}
	]
}
```

Remenber to save the access key and secret key.


If you need help with this, please follow the [AWS S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html).

Now clone de repo and create and update `.env` file with the following variables:

```
AWS_ACCESS_KEY_ID=YOUR-ACCESS-KEY
AWS_SECRET_ACCESS_KEY=YOUR-SECRET-KEY
AWS_REGION=YOUR-REGION
FILES_BUCKET=YOUR-BUCKET-NAME
SESSION_SECRET=YOUR-SESSION-SECRET

```

Now run the following commands to install the dependencies and create the database:

```
yarn install
yarn rw prisma migrate dev

```

Now you can run the app with:

```
yarn rw dev

```

