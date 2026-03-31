# Vibe

This repo is an exercise in vibe coding.

## Motivation

I have never used the SolidJS framework, and never developed in Python.

I've heard really good things about both, and I want to develop my Cursor-wrangling skills.

So I figured it was a great opportunity to combine all three.

## Approach

I created a new repo, and started off with this list of requirements:
[REQUIREMENTS.md](./REQUIREMENTS.md)

And this instructions file:
[INSTRUCTIONS.md](./INSTRUCTIONS.md)

Then I pointed Cursor at the instructions file, and away we went.

You can see the plan that Cursor created:
[PLAN.md](./PLAN.md)

## Process

This is the overall process I ended up using:

1. Instruct Cursor
2. Review generated code
3. Learn from the good bits
4. Repeat

More specifically, I found that I used Cursor and Copilot together really effectively:

- prompt Cursor to implement the next task in the plan
- review the code locally, and prompt Cursor to make changes
- Cursor then creates a branch, makes a commit, and raises a PR
- the GitHub repo is configured so that Copilot automatically reviews a non-draft PR
- once the Copilot review is complete, I instruct Cursor to check if Copilot's PR comments need actioning

I found that Copilot would often pick up code issues with the code that Cursor generated.
