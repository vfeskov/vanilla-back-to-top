LAST_COMMIT=$(git log --format="%H" -n 1)
git add --all
git commit --no-verify --fixup $LAST_COMMIT
git rebase -i --autosquash $LAST_COMMIT~1
TAG=$(git describe $(git rev-list --tags --max-count=1))
git tag -d $TAG
git tag $TAG
